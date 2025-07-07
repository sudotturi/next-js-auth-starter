"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { CheckCircle, XCircle, Clock } from "lucide-react"

function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading')
  const [message, setMessage] = useState('')
  const [showResendForm, setShowResendForm] = useState(false)
  const [email, setEmail] = useState('')
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Invalid verification link')
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })

        if (response.ok) {
          setStatus('success')
          setMessage('Email verified successfully! You can now sign in.')
        } else {
          const data = await response.json()
          if (data.error === 'Token has expired') {
            setStatus('expired')
            setMessage('Your verification link has expired')
          } else {
            setStatus('error')
            setMessage(data.error || 'Verification failed')
          }
        }
      } catch (error) {
        console.error('Verification error:', error)
        setStatus('error')
        setMessage('An error occurred during verification')
      }
    }

    verifyEmail()
  }, [token])

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault()
    setResendLoading(true)
    setResendMessage('')

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      
      if (response.ok) {
        setResendMessage('New verification email sent! Please check your inbox.')
        setShowResendForm(false)
      } else {
        setResendMessage(data.error || 'Failed to send verification email')
      }
    } catch (error) {
      console.error('Error sending verification email:', error)
      setResendMessage('An error occurred. Please try again.')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <div className="flex items-center space-x-2">
            {status === 'loading' && <Clock className="h-6 w-6 text-blue-600" />}
            {status === 'success' && <CheckCircle className="h-6 w-6 text-green-600" />}
            {(status === 'error' || status === 'expired') && <XCircle className="h-6 w-6 text-red-600" />}
            <CardTitle>Email Verification</CardTitle>
          </div>
          <CardDescription>
            {status === 'loading' && 'Verifying your email...'}
            {status === 'success' && 'Email verified successfully!'}
            {status === 'error' && 'Verification failed'}
            {status === 'expired' && 'Verification link expired'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-center space-y-4">
              <div className="text-green-600 bg-green-50 p-3 rounded-md">
                {message}
              </div>
              <Link href="/auth/signin">
                <Button className="w-full">Sign In</Button>
              </Link>
            </div>
          )}
          
          {(status === 'error' || status === 'expired') && (
            <div className="space-y-4">
              <div className="text-red-600 bg-red-50 p-3 rounded-md">
                {message}
              </div>

              {resendMessage && (
                <div className={`text-sm p-3 rounded-md ${
                  resendMessage.includes('sent') 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-red-600 bg-red-50'
                }`}>
                  {resendMessage}
                </div>
              )}

              {!showResendForm ? (
                <div className="space-y-2">
                  <Button 
                    onClick={() => setShowResendForm(true)}
                    className="w-full"
                  >
                    Get New Verification Link
                  </Button>
                  <Link href="/auth/resend-verification">
                    <Button variant="outline" className="w-full">
                      Resend Verification Email
                    </Button>
                  </Link>
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="w-full">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleResend} className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="email">Enter your email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your-email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" disabled={resendLoading} className="flex-1">
                      {resendLoading ? 'Sending...' : 'Send New Link'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowResendForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function VerifyEmailPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailPage />
    </Suspense>
  )
}