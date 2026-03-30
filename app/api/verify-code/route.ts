import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getFirebaseAdmin } from '@/lib/firebase-admin'
import { checkRateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

// Zod schema for input validation
const verifyCodeSchema = z.object({
  productId: z.string().min(1).max(50).optional(),
  code: z.string().min(1).max(50).optional(),
  token: z.string().max(500).optional(),
}).refine(data => data.token || (data.productId && data.code), {
  message: 'Must provide either token or productId + code'
})

// Get token secret - throws if not set
function getTokenSecret(): string {
  const secret = process.env.TOKEN_SECRET
  if (!secret) {
    throw new Error('TOKEN_SECRET environment variable is not set')
  }
  return secret
}

// Generate a signed token with expiry
function generateToken(productId: string): string {
  const secret = getTokenSecret()
  const exp = Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
  const payload = `${productId}:${exp}`
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  return Buffer.from(JSON.stringify({ productId, exp, sig: signature })).toString('base64')
}

// Verify a stored token with timing-safe comparison
function verifyToken(token: string, productId: string): boolean {
  try {
    const secret = getTokenSecret()
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'))
    
    // Check expiry
    if (Date.now() > decoded.exp) {
      return false
    }
    
    // Check productId matches
    if (decoded.productId !== productId) {
      return false
    }
    
    // Recreate signature and compare
    const payload = `${decoded.productId}:${decoded.exp}`
    const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('hex')
    
    // Timing-safe comparison
    if (expectedSig.length !== decoded.sig.length) {
      return false
    }
    return crypto.timingSafeEqual(Buffer.from(expectedSig), Buffer.from(decoded.sig))
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  // Rate limiting - 10 requests per minute per IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const { allowed } = checkRateLimit(ip, 10, 60000)
  
  if (!allowed) {
    return NextResponse.json(
      { valid: false, error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  try {
    const body = await request.json()
    
    // Validate input with Zod
    const parseResult = verifyCodeSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { valid: false, error: 'Invalid request' },
        { status: 400 }
      )
    }
    
    const { productId, code, token } = parseResult.data

    // Token verification (for returning users with localStorage token)
    if (token && productId) {
      const isValid = verifyToken(token, productId)
      return NextResponse.json({ valid: isValid })
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

    // Generate secure token for localStorage session
    const newToken = generateToken(productId)

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
