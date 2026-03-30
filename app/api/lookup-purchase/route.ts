import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getFirebaseAdmin } from '@/lib/firebase-admin'
import { checkRateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

// Zod schema for input validation
const lookupSchema = z.object({
  sessionId: z.string().min(10).max(200),
})

// Get token secret - throws if not set
function getTokenSecret(): string {
  const secret = process.env.TOKEN_SECRET
  if (!secret) {
    throw new Error('TOKEN_SECRET environment variable is not set')
  }
  return secret
}

// Generate a signed token with expiry (same as verify-code)
function generateToken(productId: string): string {
  const secret = getTokenSecret()
  const exp = Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
  const payload = `${productId}:${exp}`
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  return Buffer.from(JSON.stringify({ productId, exp, sig: signature })).toString('base64')
}

export async function POST(request: NextRequest) {
  // Rate limiting - 5 requests per minute per IP (stricter than verify-code)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const { allowed } = checkRateLimit(ip, 5, 60000)
  
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  try {
    const body = await request.json()
    
    // Validate input with Zod
    const parseResult = lookupSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      )
    }
    
    const { sessionId } = parseResult.data

    const { db } = getFirebaseAdmin()

    // Look up the purchase by Stripe session ID
    const querySnapshot = await db
      .collection('purchaseCodes')
      .where('stripeSessionId', '==', sessionId)
      .limit(1)
      .get()

    if (querySnapshot.empty) {
      // Purchase might not be processed yet - webhook may still be in flight
      return NextResponse.json({ 
        found: false, 
        message: 'Purchase not found. If you just completed payment, please wait a moment and refresh.' 
      }, { status: 404 })
    }

    const doc = querySnapshot.docs[0]
    const data = doc.data()

    // Check if already redeemed (one-time redemption)
    if (data.redeemed) {
      return NextResponse.json({
        found: true,
        alreadyRedeemed: true,
        productId: data.productId,
        code: data.code, // Still provide code for "other devices" use case
        message: 'This purchase has already been activated. Use your access code on other devices.'
      })
    }

    // First redemption - mark it and return token
    await doc.ref.update({
      redeemed: true,
      redeemedAt: new Date(),
    })

    // Generate token instead of returning raw code for auto-unlock
    const token = generateToken(data.productId)

    // Generate tokens for bundle products if applicable
    const bundleTokens: Record<string, string> = {}
    if (data.isBundle && data.bundleProducts) {
      for (const bundleProductId of data.bundleProducts) {
        bundleTokens[bundleProductId] = generateToken(bundleProductId)
      }
    }

    return NextResponse.json({
      found: true,
      token, // Return token for auto-unlock, not raw code
      code: data.code, // Still provide code for user to save for other devices
      productId: data.productId,
      isBundle: data.isBundle,
      bundleProducts: data.bundleProducts || [],
      bundleTokens, // Tokens for each bundle product
    })
  } catch (error) {
    console.error('Lookup purchase error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
