import Link from "next/link"
import { Gamepad2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            GameIdeaBrowser © {new Date().getFullYear()}
          </span>
        </div>
        
        <nav className="flex items-center space-x-4 text-sm text-muted-foreground">
          <Link href="/ideas" className="hover:text-foreground">
            Browse Ideas
          </Link>
          <Link href="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <Link href="/deck" className="hover:text-foreground">
            Pitch Deck
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
