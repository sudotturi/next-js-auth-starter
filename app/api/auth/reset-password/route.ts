import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      )
    }

    // Find the reset token
    const resetRecord = await prisma.verificationToken.findUnique({
      where: { 
        token,
        type: 'password_reset'
      }
    })

    if (!resetRecord) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      )
    }

    // Check if token has expired
    if (resetRecord.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { token }
      })
      return NextResponse.json(
        { error: "Token has expired" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update user password
    await prisma.user.update({
      where: { email: resetRecord.identifier },
      data: { password: hashedPassword }
    })

    // Delete the reset token
    await prisma.verificationToken.delete({
      where: { token }
    })

    return NextResponse.json({
      message: "Password reset successfully"
    })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}