import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      )
    }

    // Find the verification token
    const verificationRecord = await prisma.verificationToken.findUnique({
      where: { 
        token,
        type: 'email_verification'
      }
    })

    if (!verificationRecord) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      )
    }

    // Check if token has expired
    if (verificationRecord.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { token }
      })
      return NextResponse.json(
        { error: "Token has expired" },
        { status: 400 }
      )
    }

    // Update user as active and verified
    await prisma.user.update({
      where: { email: verificationRecord.identifier },
      data: { 
        isActive: true,
        emailVerified: new Date()
      }
    })

    // Delete the verification token
    await prisma.verificationToken.delete({
      where: { token }
    })

    return NextResponse.json({
      message: "Email verified successfully"
    })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}