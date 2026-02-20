import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { auth } from "@/lib/auth"

const openai = new OpenAI()

const systemPrompt = `You are a game market research expert. Given a game concept, provide detailed market analysis.
Return a JSON object with these fields:
- marketSize: string (e.g., "Casual puzzle: $4.2B (2025), CAGR: 14.3% through 2030")
- targetAudience: string (e.g., "Women 25-44, F2P mobile gamers")
- competitionAnalysis: string (gap analysis, what makes this different)
- similarGames: array of objects [{name, downloads, revenue, notes}] (3-5 games)
- whyNow: string (timing factors, trends, tech enablers)
- buildEstimateHours: number (solo dev hours for MVP)
- techStack: string (e.g., "Unity / Godot / HTML5 + Phaser")
- monetization: string (revenue model, pricing strategy)
- distributionPlan: string (launch channels, UA strategy)

Be specific with numbers and data. Use realistic estimates based on similar games.
Only return valid JSON, no markdown.`

export async function POST(request: NextRequest) {
  const session = await auth()
  
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const { title, genre, hook, problem } = await request.json()
  
  if (!title || !hook || !problem) {
    return NextResponse.json(
      { error: "Missing required fields: title, hook, problem" },
      { status: 400 }
    )
  }
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Game concept:
Title: ${title}
Genre: ${genre}
Hook: ${hook}
Problem: ${problem}

Provide market research data for this game concept.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    })
    
    const content = completion.choices[0].message.content
    if (!content) {
      throw new Error("No content in response")
    }
    
    const data = JSON.parse(content)
    return NextResponse.json(data)
  } catch (error) {
    console.error("AI assist error:", error)
    return NextResponse.json(
      { error: "AI assist failed" },
      { status: 500 }
    )
  }
}
