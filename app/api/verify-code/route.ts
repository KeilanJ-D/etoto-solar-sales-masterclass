import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Product passwords - stored in env vars for security
// Format: PRODUCT_PASSWORDS='{"sales-script":["SCRIPT-2026","TOOLKIT-2026"],...}'
function getProductPasswords(): Record<string, string[]> {
  const envPasswords = process.env.PRODUCT_PASSWORDS
  if (envPasswords) {
    try {
      return JSON.parse(envPasswords)
    } catch {
      console.error('Failed to parse PRODUCT_PASSWORDS env var')
    }
  }
  
  // Default passwords (for development/testing)
  return {
    'sales-script': ['SCRIPT-2026', 'TOOLKIT-2026'],
    'sales-framework': ['FRAMEWORK-2026', 'TOOLKIT-2026'],
    'appointment-quiz': ['QUIZ-2026', 'TOOLKIT-2026'],
    'formula-cheat-sheet': ['FORMULAS-2026', 'TOOLKIT-2026'],
  }
}

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

    // Token verification (for returning users)
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

    const passwords = getProductPasswords()
    const validCodes = passwords[productId]

    if (!validCodes) {
      return NextResponse.json({ valid: false, error: 'Unknown product' })
    }

    const normalizedCode = code.toUpperCase().trim()
    const isValid = validCodes.includes(normalizedCode)

    if (isValid) {
      const newToken = generateToken(productId, normalizedCode)
      return NextResponse.json({ valid: true, token: newToken })
    }

    return NextResponse.json({ valid: false })
  } catch (error) {
    console.error('Verify code error:', error)
    return NextResponse.json({ valid: false, error: 'Server error' }, { status: 500 })
  }
}
