import Link from "next/link"
import { Gamepad2, Check, TrendingUp, Clock, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IdeaCard } from "@/components/idea-card"
import { prisma } from "@/lib/db"

export const dynamic = 'force-dynamic'

async function getFeaturedIdea() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const idea = await prisma.idea.findFirst({
      where: {
        isDraft: false,
        featuredDate: {
          lte: today,
        },
      },
      orderBy: {
        featuredDate: 'desc',
      },
    })
    
    return idea
  } catch {
    return null
  }
}

export default async function HomePage() {
  const featuredIdea = await getFeaturedIdea()
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Stop guessing.
              <br />
              <span className="text-primary">Build games that have a market.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Research-backed game concepts for indie developers. New idea every day.
              Market data. Competition analysis. Build estimates. $19/mo.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/ideas">Browse Ideas Free →</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Idea of the Day */}
      {featuredIdea && (
        <section className="border-y bg-muted/30 py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Today's Idea
              </p>
              <div className="mt-6">
                <IdeaCard idea={featuredIdea} isLocked={true} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What's Inside */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center text-2xl font-bold">
            What's inside each idea
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: TrendingUp, title: "Market Size + CAGR", desc: "Data-backed market opportunity assessment" },
              { icon: Users, title: "3-5 Similar Games", desc: "With revenue and download estimates" },
              { icon: Target, title: "Competition Gap", desc: "Where the opportunity actually is" },
              { icon: Clock, title: "Build Estimate", desc: "Hours and recommended tech stack" },
              { icon: Check, title: "Monetization Model", desc: "Revenue projections and pricing" },
              { icon: Gamepad2, title: "Distribution Plan", desc: "Where to find your players" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container">
          <h2 className="text-center text-2xl font-bold">Who this is for</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {["Solo indie devs", "Small studios", "Game entrepreneurs", "Jam participants"].map(
              (who) => (
                <div
                  key={who}
                  className="rounded-full border bg-background px-4 py-2 text-sm font-medium"
                >
                  {who}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold">
              Get your first idea free
            </h2>
            <p className="mt-2 text-muted-foreground">
              Browse titles, genres, and scores. Unlock full breakdowns with Pro.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/ideas">Browse Ideas Free →</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
