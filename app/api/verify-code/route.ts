import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getFirebaseAdmin } from '@/lib/firebase-admin'

// Generate a simple token for session validation
function generateToken(productId: string, code: string): string {
  const secret = process.env.TOKEN_SECRET || 'default-secret-change-in-production'
  const data = `${productId}:${code}:${Date.now()}`
  return crypto.createHmac('sha256', secret).update(data).digest('hex').slice(0, 32)
}

// Verify a stored token (simplified - just checks format)
function isValidToken(token: string): boolean {
  return typeof token === 'string' && token.length === 32 && /^[a-f0-9]+$/.test(token)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, code, token } = body

    // Token verification (for returning users with localStorage token)
    if (token) {
      if (isValidToken(token)) {
        return NextResponse.json({ valid: true })
      }
      return NextResponse.json({ valid: false })
    }

    // Code verification (for new unlocks)
    if (!productId || !code) {
      return NextResponse.json({ valid: false, error: 'Missing productId or code' })
    }

    const normalizedCode = code.toUpperCase().trim()

    const { db } = getFirebaseAdmin()

    // Query Firestore for the code
    const querySnapshot = await db
      .collection('purchaseCodes')
      .where('code', '==', normalizedCode)
      .limit(1)
      .get()

    if (querySnapshot.empty) {
      return NextResponse.json({ valid: false, error: 'Invalid code' })
    }

    const doc = querySnapshot.docs[0]
    const data = doc.data()

    // Check if code matches productId directly OR is a bundle that includes this product
    const codeMatchesProduct = data.productId === productId
    const bundleIncludesProduct = data.isBundle && data.bundleProducts?.includes(productId)

    if (!codeMatchesProduct && !bundleIncludesProduct) {
      return NextResponse.json({ valid: false, error: 'Code not valid for this product' })
    }

    // Check activation limit
    if (data.activations >= data.maxActivations) {
      return NextResponse.json({ 
        valid: false, 
        error: `This code has reached its maximum of ${data.maxActivations} device activations. Please contact support if you need assistance.` 
      })
    }

    // Increment activation count
    await doc.ref.update({
      activations: data.activations + 1,
      lastActivatedAt: new Date(),
    })

    // Generate token for localStorage session
    const newToken = generateToken(productId, normalizedCode)

    return NextResponse.json({ 
      valid: true, 
      token: newToken,
      isBundle: data.isBundle,
      bundleProducts: data.bundleProducts || [],
      activationsRemaining: data.maxActivations - data.activations - 1,
    })
  } catch (error) {
    console.error('Verify code error:', error)
    return NextResponse.json({ valid: false, error: 'Server error' }, { status: 500 })
  }
}
