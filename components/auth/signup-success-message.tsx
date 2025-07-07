"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, CheckCircle } from "lucide-react"

interface SignUpSuccessMessageProps {
  email: string
}

export function SignUpSuccessMessage({ email }: SignUpSuccessMessageProps) {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <CardTitle>Account Created Successfully!</CardTitle>
        </div>
        <CardDescription>
          Please check your email to verify your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-blue-100 p-3">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              We've sent a verification email to:
            </p>
            <p className="font-medium text-gray-900">{email}</p>
          </div>
          
          <div className="text-sm text-gray-600 space-y-1">
            <p>Click the verification link in your email to activate your account.</p>
            <p>The link will expire in 24 hours.</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Link href="/auth/resend-verification">
            <Button variant="outline" className="w-full">
              Didn't receive email? Resend
            </Button>
          </Link>
          
          <Link href="/auth/signin">
            <Button variant="ghost" className="w-full">
              Back to Sign In
            </Button>
          </Link>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          Make sure to check your spam folder if you don't see the email.
        </div>
      </CardContent>
    </Card>
  )
}