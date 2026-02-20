"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Gamepad2 } from "lucide-react"

export function Header() {
  const { data: session, status } = useSession()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <span className="font-bold">GameIdeaBrowser</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link 
            href="/ideas" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Browse Ideas
          </Link>
          <Link 
            href="/pricing" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>
          
          {status === "loading" ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          ) : session ? (
            <div className="flex items-center gap-4">
              {session.user.isAdmin && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm">Admin</Button>
                </Link>
              )}
              {session.user.plan !== 'free' && (
                <span className="text-xs font-medium uppercase text-primary">
                  {session.user.plan}
                </span>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/pricing">
                <Button size="sm">Get Pro — $19</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
