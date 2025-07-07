import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// Extend NextAuth types to include 'id' on user
import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      isActive: boolean
    } & DefaultSession["user"]
  }
  interface User extends DefaultUser {
    id: string
    isActive: boolean,
    emailVerified?: Date | null
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          return null
        }

        // Check if user is active (email verified)
        if (!user.isActive) {
          throw new Error("Please verify your email before signing in")
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isActive: user.isActive,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isActive = user.isActive
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.isActive = token.isActive as boolean
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      // This event is triggered when a new user is created
      // For Google OAuth users, ensure they're marked as active
      if (user.email) {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              emailVerified: new Date(), // Set email as verified
              isActive: true,
            }
          })
        } catch (error) {
          console.error("Error in createUser event:", error)
        }
      }
    },
  },
}