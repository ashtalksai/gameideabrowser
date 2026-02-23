export const dynamic = 'force-dynamic'

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Gamepad2, Share2 } from "lucide-react"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScoreBreakdown } from "@/components/score-breakdown"
import { PaywallBlur } from "@/components/paywall-blur"
import { calculateTotalScore } from "@/lib/utils"

interface Props {
  params: Promise<{ slug: string }>
}

async function getIdea(slug: string) {
  return prisma.idea.findUnique({
    where: { slug },
  })
}

const platformEmojis: Record<string, string> = {
  mobile: "📱 Mobile",
  web: "🌐 Web",
  desktop: "🖥️ Desktop",
  both: "🎮 Cross-platform",
}

export default async function IdeaDetailPage({ params }: Props) {
  const { slug } = await params
  const session = await auth()
  const idea = await getIdea(slug)
  
  if (!idea || idea.isDraft) {
    notFound()
  }
  
  const isPro = session?.user?.plan === 'pro' || session?.user?.plan === 'lifetime'
  const totalScore = calculateTotalScore(idea)
  const similarGames = idea.similarGames as Array<{name: string, revenue?: string, downloads?: string, notes?: string}> | null
  
  // Free content - always visible
  const freeContent = (
    <>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span>{platformEmojis[idea.platform]}</span>
        <Badge>{idea.genre}</Badge>
        {idea.buildEstimateHours && (
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            {idea.buildEstimateHours}h
          </span>
        )}
      </div>
      
      <h1 className="text-3xl font-bold">{idea.title}</h1>
      
      <p className="text-lg italic text-muted-foreground">
        "{idea.hook}"
      </p>
      
      <ScoreBreakdown scores={idea} />
    </>
  )
  
  // Pro content - paywalled
  const proContent = (
    <div className="space-y-8">
      {idea.problem && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The Problem
          </h2>
          <p className="mt-2">{idea.problem}</p>
        </section>
      )}
      
      {idea.marketSize && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Market
          </h2>
          <p className="mt-2">{idea.marketSize}</p>
          {idea.targetAudience && (
            <p className="mt-2 text-sm text-muted-foreground">
              Target: {idea.targetAudience}
            </p>
          )}
        </section>
      )}
      
      {similarGames && similarGames.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Similar Games
          </h2>
          <div className="mt-4 space-y-2">
            {similarGames.map((game, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <span className="font-medium">{game.name}</span>
                <div className="text-sm text-muted-foreground">
                  {game.downloads && <span>{game.downloads} DL</span>}
                  {game.revenue && <span className="ml-2">{game.revenue}</span>}
                </div>
              </div>
            ))}
          </div>
          {idea.competitionAnalysis && (
            <p className="mt-4 text-sm text-muted-foreground">
              {idea.competitionAnalysis}
            </p>
          )}
        </section>
      )}
      
      {idea.whyNow && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Why Now
          </h2>
          <p className="mt-2">{idea.whyNow}</p>
        </section>
      )}
      
      {(idea.buildEstimateHours || idea.techStack) && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Build Estimate
          </h2>
          <div className="mt-2 space-y-1">
            {idea.buildEstimateHours && (
              <p>{idea.buildEstimateHours} hours (solo dev)</p>
            )}
            {idea.techStack && (
              <p className="text-sm text-muted-foreground">Engine: {idea.techStack}</p>
            )}
          </div>
        </section>
      )}
      
      {idea.monetization && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Monetization
          </h2>
          <p className="mt-2">{idea.monetization}</p>
        </section>
      )}
      
      {idea.distributionPlan && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Distribution Plan
          </h2>
          <p className="mt-2">{idea.distributionPlan}</p>
        </section>
      )}
    </div>
  )
  
  return (
    <div className="py-12">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <Link 
            href="/ideas" 
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to ideas
          </Link>
          
          <div className="space-y-6">
            {freeContent}
            
            {isPro ? (
              proContent
            ) : (
              <PaywallBlur>
                {proContent}
              </PaywallBlur>
            )}
          </div>
          
          {isPro && (
            <div className="mt-12 flex items-center justify-between border-t pt-6">
              <Link href="/ideas">
                <Button variant="outline">← Previous idea</Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Link href="/ideas">
                <Button variant="outline">Next idea →</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
