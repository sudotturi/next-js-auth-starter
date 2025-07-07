import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { sendVerificationEmail } from "@/lib/email"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user (inactive by default)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isActive: false, // User starts inactive
      },
    })

    // Generate verification token
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
      message: "User created successfully. Please check your email to verify your account.",
      user: { id: user.id, name: user.name, email: user.email }
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}