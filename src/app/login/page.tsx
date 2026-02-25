"use client"

import { useFormStatus } from "react-dom"
import { Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginAction } from "./actions"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing in..." : "Continue"}
    </Button>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Gamepad2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Sign in to GameIdeaBrowser</CardTitle>
          <CardDescription>
            Enter your email to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form action={loginAction} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
            />
            <SubmitButton />
          </form>
          
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Enter any email to access the site.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
