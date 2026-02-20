"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn, calculateTotalScore } from "@/lib/utils"

interface IdeaCardProps {
  idea: {
    id: string
    slug: string
    title: string
    genre: string
    platform: string
    hook: string
    scoreMarket: number
    scoreDifficulty: number
    scoreCompetition: number
    scoreMonetization: number
    scoreTiming: number
  }
  isLocked?: boolean
  className?: string
}

const platformEmojis: Record<string, string> = {
  mobile: "📱",
  web: "🌐",
  desktop: "🖥️",
  both: "🎮",
}

const genreVariants: Record<string, "puzzle" | "idle" | "party" | "cozy" | "daily" | "narrative" | "multiplayer" | "hypercasual" | "secondary"> = {
  Puzzle: "puzzle",
  Idle: "idle",
  Party: "party",
  Cozy: "cozy",
  "Daily Challenge": "daily",
  Narrative: "narrative",
  Multiplayer: "multiplayer",
  Hypercasual: "hypercasual",
}

export function IdeaCard({ idea, isLocked = false, className }: IdeaCardProps) {
  const totalScore = calculateTotalScore(idea)
  const genreVariant = genreVariants[idea.genre] || "secondary"
  
  return (
    <Link href={`/ideas/${idea.slug}`}>
      <Card className={cn(
        "group relative cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg",
        className
      )}>
        {isLocked && (
          <div className="absolute right-3 top-3 z-10">
            <Lock className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        
        <CardHeader className="space-y-2 pb-3">
          <div className="flex items-center gap-2 text-sm">
            <span>{platformEmojis[idea.platform] || "🎮"}</span>
            <Badge variant={genreVariant}>{idea.genre}</Badge>
          </div>
          <h3 className="text-xl font-bold leading-tight">{idea.title}</h3>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className={cn(
            "text-sm italic text-muted-foreground",
            isLocked && "blur-sm select-none"
          )}>
            "{idea.hook}"
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Score</span>
              <span className="font-mono font-bold">{totalScore}/100</span>
            </div>
            <Progress value={totalScore} max={100} />
          </div>
          
          {isLocked && (
            <p className="text-center text-xs text-muted-foreground">
              Full breakdown for Pro members
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
