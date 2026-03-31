import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getFirebaseAdmin } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

// Lazy initialization to avoid build-time errors
let stripeInstance: Stripe | null = null

function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!)
  }
  return stripeInstance
}

// Product prefixes for code generation
const PRODUCT_PREFIXES: Record<string, string> = {
  'sales-script': 'SCRIPT',
  'sales-framework': 'FRAMEWORK',
  'appointment-quiz': 'QUIZ',
  'formula-cheat-sheet': 'FORMULAS',
  'complete-toolkit': 'TOOLKIT',
}

// Bundle products
const BUNDLE_PRODUCTS = ['sales-script', 'sales-framework', 'appointment-quiz', 'formula-cheat-sheet']

function generateUniqueCode(prefix: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Removed confusing chars like 0/O, 1/I
  let suffix = ''
  for (let i = 0; i < 6; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `${prefix}-${suffix}`
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Get product info from metadata
    const productId = session.metadata?.product_id
    const isBundle = session.metadata?.is_bundle === 'true'
    const customerEmail = session.customer_details?.email || session.customer_email || 'unknown'

    if (!productId) {
      console.error('No product_id in session metadata:', session.id)
      return NextResponse.json({ error: 'Missing product_id metadata' }, { status: 400 })
    }

    const prefix = PRODUCT_PREFIXES[productId] || 'CODE'
    const code = generateUniqueCode(prefix)

    try {
      const { db } = getFirebaseAdmin()

      // Check if a code already exists for this session (idempotency)
      const existingQuery = await db
        .collection('purchaseCodes')
        .where('stripeSessionId', '==', session.id)
        .get()

      if (!existingQuery.empty) {
        console.log('Code already exists for session:', session.id)
        return NextResponse.json({ received: true, code: existingQuery.docs[0].data().code })
      }

      // Create the purchase code document
      await db.collection('purchaseCodes').add({
        code,
        productId,
        stripeSessionId: session.id,
        customerEmail,
        purchasedAt: FieldValue.serverTimestamp(),
        activations: 0,
        maxActivations: 3,
        isBundle,
        bundleProducts: isBundle ? BUNDLE_PRODUCTS : [],
      })

      console.log('Created purchase code:', code, 'for product:', productId, 'session:', session.id)

      return NextResponse.json({ received: true, code })
    } catch (err) {
      console.error('Failed to create purchase code:', err)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
