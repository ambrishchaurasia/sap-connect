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
import { AlertCircle, Users, LogIn } from "lucide-react"
import { loginUser } from "@/lib/auth"
import { connectDB } from "@/config/db";

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // /app/login/page.tsx or API route


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate email domain
      if (!email.endsWith("@stu.upes.ac.in")) {
        throw new Error("Only UPES student email addresses are allowed")
      }

      const success = await loginUser(email, password)

      if (success) {
        router.push("/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login")
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
          <CardTitle className="text-2xl text-blue-dark">Login</CardTitle>
          <CardDescription>Enter your UPES student email and password to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
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
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-blue-DEFAULT hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-blue-light/30 focus-visible:ring-blue-DEFAULT"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-blue-DEFAULT hover:bg-blue-dark" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
              {!loading && <LogIn className="ml-2 h-4 w-4" />}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-DEFAULT hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

