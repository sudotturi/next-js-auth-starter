"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setTokenValid(false)
      setError('Invalid reset link')
      return
    }
    
    // Token validation happens on form submission
    // We could optionally validate token immediately here
    setTokenValid(true)
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      if (response.ok) {
        setSuccess(true)
        // Redirect to sign in after 3 seconds
        setTimeout(() => {
          router.push('/auth/signin')
        }, 3000)
      } else {
        const data = await response.json()
        if (data.error === "Invalid or expired token" || data.error === "Token has expired") {
          setTokenValid(false)
        }
        setError(data.error || "Failed to reset password")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // If token is invalid or missing
  if (tokenValid === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Invalid Reset Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-red-600 bg-red-50 p-3 rounded-md">
              {error || "This reset link is no longer valid. Password reset links expire after 1 hour for security reasons."}
            </div>
            <div className="space-y-2">
              <Link href="/auth/forgot-password">
                <Button className="w-full">Request New Reset Link</Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" className="w-full">Back to Sign In</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If password was successfully reset
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Password Reset Successful</CardTitle>
            <CardDescription>
              Your password has been successfully reset
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-green-600 bg-green-50 p-3 rounded-md">
              Your password has been reset successfully. You will be redirected to the sign-in page in a few seconds.
            </div>
            <Link href="/auth/signin">
              <Button className="w-full">Sign In Now</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
          
          <div className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}