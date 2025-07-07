import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPasswordResetEmail } from "@/lib/email"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists or not
      return NextResponse.json({
        message: "If an account with that email exists, we've sent a password reset link."
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Delete any existing reset tokens for this user
    await prisma.verificationToken.deleteMany({
      where: { 
        identifier: email,
        type: 'password_reset'
      }
    })

    // Create new reset token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: resetToken,
        expires,
        type: 'password_reset'
      }
    })

    // Send reset email
    await sendPasswordResetEmail(email, resetToken)

    return NextResponse.json({
      message: "If an account with that email exists, we've sent a password reset link."
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}