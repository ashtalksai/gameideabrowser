"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    
    await signIn("resend", { 
      email,
      callbackUrl: "/ideas",
    })
    
    setIsLoading(false)
  }
  
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Gamepad2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Sign in to GameIdeaBrowser</CardTitle>
          <CardDescription>
            Enter your email to receive a magic link
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send magic link"}
            </Button>
          </form>
          
          <p className="mt-4 text-center text-sm text-muted-foreground">
            No password needed. We'll send you a secure link.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
