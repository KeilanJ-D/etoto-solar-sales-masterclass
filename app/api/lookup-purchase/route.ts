import { NextRequest, NextResponse } from 'next/server'
import { getFirebaseAdmin } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
    }

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

    return NextResponse.json({
      found: true,
      code: data.code,
      productId: data.productId,
      isBundle: data.isBundle,
      bundleProducts: data.bundleProducts || [],
    })
  } catch (error) {
    console.error('Lookup purchase error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
