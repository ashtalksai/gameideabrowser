import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(request: NextRequest) {
  const session = await auth()
  
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const data = await request.json()
  
  const idea = await prisma.idea.create({
    data: {
      slug: data.slug,
      title: data.title,
      genre: data.genre,
      platform: data.platform,
      hook: data.hook,
      problem: data.problem || null,
      opportunity: data.opportunity || null,
      marketSize: data.marketSize || null,
      targetAudience: data.targetAudience || null,
      competitionAnalysis: data.competitionAnalysis || null,
      similarGames: data.similarGames || null,
      whyNow: data.whyNow || null,
      buildEstimateHours: data.buildEstimateHours || null,
      techStack: data.techStack || null,
      monetization: data.monetization || null,
      distributionPlan: data.distributionPlan || null,
      scoreMarket: data.scoreMarket || 0,
      scoreDifficulty: data.scoreDifficulty || 0,
      scoreCompetition: data.scoreCompetition || 0,
      scoreMonetization: data.scoreMonetization || 0,
      scoreTiming: data.scoreTiming || 0,
      isDraft: data.isDraft ?? true,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      featuredDate: data.featuredDate ? new Date(data.featuredDate) : null,
    },
  })
  
  return NextResponse.json(idea)
}

export async function GET(request: NextRequest) {
  const session = await auth()
  
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const ideas = await prisma.idea.findMany({
    orderBy: { createdAt: 'desc' },
  })
  
  return NextResponse.json(ideas)
}
