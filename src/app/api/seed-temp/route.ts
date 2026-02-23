import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Temporary seed endpoint - DELETE AFTER USE
const ideas = [
  {
    slug: "idle-fossil-hunter",
    title: "Idle Fossil Hunter",
    genre: "Idle/Clicker",
    platform: "mobile",
    hook: "Excavate, collect, and evolve prehistoric creatures while you're away",
    problem: "Idle games are repetitive; fossil/dino niche is underserved in idle genre",
    opportunity: "Combine idle mechanics with collection + evolution systems",
    scoreMarket: 88,
    scoreDifficulty: 80,
    scoreCompetition: 85,
    scoreMonetization: 90,
    scoreTiming: 85,
    isDraft: false,
    publishedAt: new Date(),
  },
  {
    slug: "tap-survivor",
    title: "Tap Survivor",
    genre: "Roguelike",
    platform: "mobile",
    hook: "One-button roguelike where timing is everything",
    problem: "Mobile roguelikes have complex controls that don't fit the platform",
    opportunity: "Distill roguelike to pure timing-based gameplay",
    scoreMarket: 85,
    scoreDifficulty: 90,
    scoreCompetition: 82,
    scoreMonetization: 88,
    scoreTiming: 85,
    isDraft: false,
    publishedAt: new Date(),
  },
  {
    slug: "pocket-dm",
    title: "Pocket DM",
    genre: "RPG/AI",
    platform: "mobile",
    hook: "AI dungeon master in your pocket - infinite adventures",
    problem: "D&D requires groups and scheduling; AI Dungeon is bloated",
    opportunity: "Focused, mobile-first AI DM with tight UX",
    scoreMarket: 80,
    scoreDifficulty: 75,
    scoreCompetition: 85,
    scoreMonetization: 85,
    scoreTiming: 85,
    isDraft: false,
    publishedAt: new Date(),
  },
  {
    slug: "village-courier",
    title: "Village Courier",
    genre: "Cozy/Simulation",
    platform: "desktop",
    hook: "Cozy delivery game in a charming village where packages tell stories",
    problem: "Cozy games lack meaningful objectives; delivery games lack warmth",
    opportunity: "Merge cozy aesthetics with light narrative delivery mechanics",
    scoreMarket: 78,
    scoreDifficulty: 82,
    scoreCompetition: 80,
    scoreMonetization: 78,
    scoreTiming: 82,
    isDraft: false,
    publishedAt: new Date(),
  },
  {
    slug: "last-word-standing",
    title: "Last Word Standing",
    genre: "Word/Battle Royale",
    platform: "mobile",
    hook: "100-player word battle royale - spell or be eliminated",
    problem: "Word games are solo; multiplayer word games feel slow",
    opportunity: "Real-time competitive word game with elimination",
    scoreMarket: 85,
    scoreDifficulty: 78,
    scoreCompetition: 90,
    scoreMonetization: 88,
    scoreTiming: 88,
    isDraft: false,
    publishedAt: new Date(),
  },
  {
    slug: "beat-dungeon",
    title: "Beat Dungeon",
    genre: "Rhythm/Roguelike",
    platform: "mobile",
    hook: "Rhythm-based roguelike where the beat drives combat",
    problem: "Crypt of the NecroDancer is great but desktop-focused",
    opportunity: "Mobile-native rhythm roguelike with touch controls",
    scoreMarket: 72,
    scoreDifficulty: 70,
    scoreCompetition: 80,
    scoreMonetization: 75,
    scoreTiming: 78,
    isDraft: false,
    publishedAt: new Date(),
  },
  {
    slug: "critter-clash",
    title: "Critter Clash",
    genre: "Auto-battler",
    platform: "mobile",
    hook: "Collect and evolve cute creatures in strategic auto-battles",
    problem: "Auto-battlers are complex; pet games are shallow",
    opportunity: "Accessible auto-battler with pet collection loop",
    scoreMarket: 80,
    scoreDifficulty: 75,
    scoreCompetition: 78,
    scoreMonetization: 82,
    scoreTiming: 80,
    isDraft: false,
    publishedAt: new Date(),
  },
  {
    slug: "dreamwalker",
    title: "Dreamwalker",
    genre: "Adventure/Idle",
    platform: "mobile",
    hook: "Your character adventures in their dreams while you sleep",
    problem: "Sleep apps are boring; idle games ignore real-world time",
    opportunity: "Game that syncs with actual sleep patterns",
    scoreMarket: 82,
    scoreDifficulty: 78,
    scoreCompetition: 90,
    scoreMonetization: 80,
    scoreTiming: 88,
    isDraft: false,
    publishedAt: new Date(),
  },
  {
    slug: "tiny-towns",
    title: "Tiny Towns",
    genre: "City Builder",
    platform: "mobile",
    hook: "Micro city builder that fits in 5-minute sessions",
    problem: "City builders require long sessions; mobile versions are P2W",
    opportunity: "Distilled city builder with no energy mechanics",
    scoreMarket: 85,
    scoreDifficulty: 80,
    scoreCompetition: 82,
    scoreMonetization: 85,
    scoreTiming: 85,
    isDraft: false,
    publishedAt: new Date(),
  },
  {
    slug: "kitchen-siege",
    title: "Kitchen Siege",
    genre: "Tower Defense/Cooking",
    platform: "mobile",
    hook: "Defend your restaurant from food critics with culinary towers",
    problem: "TD games are stale; cooking games lack depth",
    opportunity: "Unique twist combining two proven genres",
    scoreMarket: 80,
    scoreDifficulty: 82,
    scoreCompetition: 85,
    scoreMonetization: 80,
    scoreTiming: 82,
    isDraft: false,
    publishedAt: new Date(),
  },
  {
    slug: "idle-fc",
    title: "Idle FC",
    genre: "Sports/Idle",
    platform: "mobile",
    hook: "Build your football empire while away - transfers, training, matches",
    problem: "Football managers are too complex for casual play",
    opportunity: "Idle mechanics + football management = massive market",
    scoreMarket: 92,
    scoreDifficulty: 85,
    scoreCompetition: 88,
    scoreMonetization: 90,
    scoreTiming: 90,
    isDraft: false,
    publishedAt: new Date(),
  },
  {
    slug: "melody-merge",
    title: "Melody Merge",
    genre: "Puzzle/Music",
    platform: "mobile",
    hook: "Merge notes to compose music - puzzle meets creation",
    problem: "Merge games are mindless; music games require skill",
    opportunity: "Creative merge game that produces actual melodies",
    scoreMarket: 85,
    scoreDifficulty: 80,
    scoreCompetition: 90,
    scoreMonetization: 85,
    scoreTiming: 88,
    isDraft: false,
    publishedAt: new Date(),
  },
]

export async function GET() {
  try {
    const results = []
    
    for (const idea of ideas) {
      // Check if already exists
      const existing = await prisma.idea.findUnique({
        where: { slug: idea.slug }
      })
      
      if (existing) {
        results.push({ title: idea.title, status: "exists" })
        continue
      }
      
      await prisma.idea.create({ data: idea })
      results.push({ title: idea.title, status: "created" })
    }
    
    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}
