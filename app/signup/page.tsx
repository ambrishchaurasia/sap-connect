"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Users, ArrowRight, Check } from "lucide-react"
import { signupUser, sendOTP, verifyOTP } from "@/lib/auth"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate email domain
      if (!email.endsWith("@stu.upes.ac.in")) {
        throw new Error("Only UPES student email addresses are allowed")
      }

      // Validate password strength
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }

      // Validate password match
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      const success = await sendOTP(email)

      if (success) {
        setStep(2)
      } else {
        throw new Error("Failed to send OTP. Please try again.")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!otp || otp.length !== 6) {
        throw new Error("Please enter a valid 6-digit OTP")
      }

      const otpVerified = await verifyOTP(email, otp)

      if (otpVerified) {
        const signupSuccess = await signupUser(email, password)

        if (signupSuccess) {
          router.push("/create-profile")
        } else {
          throw new Error("Failed to create account. Email might already be in use.")
        }
      } else {
        throw new Error("Invalid OTP. Please try again.")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during verification")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-light/10 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 font-bold md:left-12 md:top-12">
        <Users className="h-5 w-5 text-blue-DEFAULT" />
        <span className="text-blue-DEFAULT">UPES Project Collab</span>
      </Link>

      <Card className="w-full max-w-md border-blue-light/20 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-blue-dark">Create an account</CardTitle>
          <CardDescription>Sign up with your UPES student email to get started</CardDescription>
        </CardHeader>

        {step === 1 ? (
          <form onSubmit={handleSendOTP}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@stu.upes.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-blue-light/30 focus-visible:ring-blue-DEFAULT"
                />
                <p className="text-xs text-muted-foreground">Only UPES student email addresses are allowed</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-blue-light/30 focus-visible:ring-blue-DEFAULT"
                />
                <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-blue-light/30 focus-visible:ring-blue-DEFAULT"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-blue-DEFAULT hover:bg-blue-dark" disabled={loading}>
                {loading ? "Sending OTP..." : "Continue"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-DEFAULT hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <div className="mb-4 rounded-lg bg-blue-light/10 p-4 text-center">
                  <p className="text-sm text-blue-dark">
                    We've sent a verification code to <strong>{email}</strong>
                  </p>
                </div>
                <Label htmlFor="otp">Enter Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  required
                  className="border-blue-light/30 focus-visible:ring-blue-DEFAULT text-center text-lg tracking-widest"
                />
                <p className="text-xs text-muted-foreground text-center">
                  Didn't receive the code?{" "}
                  <button type="button" onClick={() => setStep(1)} className="text-blue-DEFAULT hover:underline">
                    Try again
                  </button>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-blue-DEFAULT hover:bg-blue-dark" disabled={loading}>
                {loading ? "Verifying..." : "Verify and Create Account"}
                {!loading && <Check className="ml-2 h-4 w-4" />}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full border-blue-light/30 text-blue-DEFAULT"
                onClick={() => setStep(1)}
                disabled={loading}
              >
                Back
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}

