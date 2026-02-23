"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PaywallBlurProps {
  children: React.ReactNode
  className?: string
}

export function PaywallBlur({ children, className }: PaywallBlurProps) {
  return (
    <div className={cn("relative min-h-[280px] rounded-lg border bg-muted/30", className)}>
      <div className="pointer-events-none select-none blur-md saturate-50 p-6">
        {children}
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
        <div className="text-center space-y-4 p-6 max-w-sm">
          <p className="text-lg font-semibold">
            Full breakdown for Pro members
          </p>
          <p className="text-sm text-muted-foreground">
            Unlock full market data, competition analysis, build estimates, and more.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link href="/pricing">
              Unlock for $19/mo →
            </Link>
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          
          <form className="space-y-2">
            <Input 
              type="email" 
              placeholder="your@email.com" 
              className="text-center"
            />
            <Button variant="outline" className="w-full" type="submit">
              Get notified of new ideas free
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
