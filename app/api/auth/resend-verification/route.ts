import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendVerificationEmail } from "@/lib/email"
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
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: "If an account with that email exists and is unverified, we've sent a verification email."
      })
    }

    if (user.isActive) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      )
    }

    // Check if there's already a recent verification token (rate limiting)
    const existingToken = await prisma.verificationToken.findFirst({
      where: { 
        identifier: email,
        type: 'email_verification',
        expires: {
          gt: new Date() // Not expired yet
        }
      },
      orderBy: {
        expires: 'desc'
      }
    })

    // If token was created less than 5 minutes ago, don't allow resend
    if (existingToken) {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
      const tokenCreatedAt = new Date(existingToken.expires.getTime() - 24 * 60 * 60 * 1000) // Token expires in 24h, so creation time is expires - 24h
      
      if (tokenCreatedAt > fiveMinutesAgo) {
        return NextResponse.json(
          { error: "Please wait 5 minutes before requesting another verification email" },
          { status: 429 }
        )
      }
    }

    // Delete any existing verification tokens for this user
    await prisma.verificationToken.deleteMany({
      where: { 
        identifier: email,
        type: 'email_verification'
      }
    })

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verificationToken,
        expires,
        type: 'email_verification'
      }
    })

    // Send verification email
    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json({
      message: "Verification email sent successfully"
    })
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}