import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { Platform } from "@prisma/client"

const ideas = [
  {
    slug: "idle-fossil-hunter",
    title: "Idle Fossil Hunter",
    genre: "Idle / Clicker",
    platform: Platform.mobile,
    hook: "Dig through geological layers while you sleep — wake up to prehistoric treasures",
    problem: "Idle games lack educational value; fossil/archaeology themes underexplored in casual mobile",
    opportunity: "Idle games hit $2.3B in 2025. Paleontology content trending",
    marketSize: "$2.3B idle game market, 15% YoY growth",
    targetAudience: "Casual mobile gamers 25-45, science enthusiasts",
    competitionAnalysis: "No dominant fossil-themed idle game. Gap: educational + collectible focus",
    similarGames: [
      { name: "Idle Miner Tycoon", revenue: "$150M lifetime", downloads: "100M+" },
      { name: "Cell to Singularity", revenue: "$20M+", downloads: "10M+" }
    ],
    whyNow: "Post-pandemic museum boom, idle genre mature but theme-starved",
    buildEstimateHours: 120,
    techStack: "Unity + PlayFab + AdMob",
    monetization: "Ads + IAP ($2.99-$9.99) + Battle Pass ($4.99/month)",
    distributionPlan: "TikTok influencers, r/incremental_games",
    scoreMarket: 22, scoreDifficulty: 20, scoreCompetition: 23, scoreMonetization: 13, scoreTiming: 8,
  },
  {
    slug: "one-button-roguelike",
    title: "Tap Survivor",
    genre: "Roguelike / Casual",
    platform: Platform.mobile,
    hook: "Vampire Survivors meets one-tap controls — most accessible roguelike ever",
    problem: "VS clones require too much input for casual mobile play",
    opportunity: "VS-likes $100M+ but mobile versions feel cramped",
    marketSize: "Vampire Survivors-like genre: $100M+",
    targetAudience: "Casual mobile gamers, VS fans wanting simpler experience",
    competitionAnalysis: "Survivor.io proved demand but complex controls. Gap: radical simplification",
    similarGames: [
      { name: "Survivor.io", revenue: "$200M+", downloads: "80M+" },
      { name: "Vampire Survivors", revenue: "$50M+", downloads: "10M+" }
    ],
    whyNow: "VS fatigue setting in — need innovation",
    buildEstimateHours: 80,
    techStack: "Unity + Unity Gaming Services",
    monetization: "Ads + IAP characters ($1.99) + Remove Ads $3.99",
    distributionPlan: "TikTok gameplay clips, r/roguelikes",
    scoreMarket: 23, scoreDifficulty: 22, scoreCompetition: 20, scoreMonetization: 14, scoreTiming: 7,
  },
  {
    slug: "ai-dungeon-master",
    title: "Pocket DM",
    genre: "AI RPG / Text Adventure",
    platform: Platform.mobile,
    hook: "GPT-powered dungeon master — infinite campaigns, zero prep",
    problem: "D&D requires coordination. Solo tools are dice-rollers, not storytellers",
    opportunity: "D&D hit $1B+ in 2024. AI Dungeon proved demand",
    marketSize: "D&D/TTRPG: $1B+, AI gaming: $500M+",
    targetAudience: "D&D players without groups, fantasy fans",
    competitionAnalysis: "AI Dungeon unfocused. No D&D-specific AI DM with rules engine",
    similarGames: [
      { name: "AI Dungeon", revenue: "$20M+", downloads: "10M+" },
      { name: "Baldur's Gate 3", revenue: "$500M+", downloads: "15M+" }
    ],
    whyNow: "GPT-4 quality leap, BG3 brought millions of new fans",
    buildEstimateHours: 160,
    techStack: "React Native + OpenAI GPT-4o-mini + Supabase",
    monetization: "Freemium + $9.99/mo subscription + Lifetime $79.99",
    distributionPlan: "D&D subreddits, TTRPG podcasts",
    scoreMarket: 21, scoreDifficulty: 15, scoreCompetition: 22, scoreMonetization: 14, scoreTiming: 10,
  },
  {
    slug: "cozy-delivery-sim",
    title: "Village Courier",
    genre: "Cozy Simulation",
    platform: Platform.both,
    hook: "Delivery service in a Ghibli-inspired village — no combat, just vibes",
    problem: "Cozy games booming but delivery genre is hardcore",
    opportunity: "Cozy games $2B+. Delivery mechanics proven addictive",
    marketSize: "Cozy game market: $2B+, 25% YoY growth",
    targetAudience: "Cozy gamers 20-40, Stardew fans",
    competitionAnalysis: "No cozy delivery sim exists",
    similarGames: [
      { name: "Stardew Valley", revenue: "$300M+", downloads: "30M+" },
      { name: "A Short Hike", revenue: "$5M+", downloads: "1M+" }
    ],
    whyNow: "Post-pandemic cozy boom, Ghibli aesthetic trending",
    buildEstimateHours: 180,
    techStack: "Godot 4 + Aseprite",
    monetization: "Premium $14.99 + DLC villages ($4.99)",
    distributionPlan: "Steam Next Fest, Wholesome Direct",
    scoreMarket: 20, scoreDifficulty: 17, scoreCompetition: 23, scoreMonetization: 11, scoreTiming: 9,
  },
  {
    slug: "word-battle-royale",
    title: "Last Word Standing",
    genre: "Word Game / Battle Royale",
    platform: Platform.mobile,
    hook: "99 players, one word puzzle — fastest fingers win",
    problem: "Word games are solo. Multiplayer word games are slow async",
    opportunity: "Word games $3B+. Real-time multiplayer trending",
    marketSize: "Word/puzzle: $3B+, Battle royale: $5B+",
    targetAudience: "Wordle addicts, competitive puzzlers",
    competitionAnalysis: "No real-time mass multiplayer word game",
    similarGames: [
      { name: "Wordle", revenue: "NYT acquisition", downloads: "300M+ plays" },
      { name: "Fall Guys", revenue: "$200M+", downloads: "50M+" }
    ],
    whyNow: "Wordle created word game renaissance",
    buildEstimateHours: 140,
    techStack: "Unity + Photon (multiplayer)",
    monetization: "F2P cosmetics + Battle Pass $5.99/season",
    distributionPlan: "TikTok clips, Wordle communities",
    scoreMarket: 22, scoreDifficulty: 16, scoreCompetition: 25, scoreMonetization: 13, scoreTiming: 10,
  },
  {
    slug: "rhythm-roguelike",
    title: "Beat Dungeon",
    genre: "Rhythm / Roguelike",
    platform: Platform.both,
    hook: "Crypt of the NecroDancer meets Hades — move to the music",
    problem: "Rhythm roguelikes are niche. Opportunity to mainstream",
    opportunity: "Rhythm games $3B+. Roguelikes $500M+",
    marketSize: "Rhythm: $3B+, Roguelikes: $500M+",
    targetAudience: "Rhythm fans, roguelike addicts",
    competitionAnalysis: "Crypt of NecroDancer dated. Gap: accessible 2D action",
    similarGames: [
      { name: "Hades", revenue: "$300M+", downloads: "10M+" },
      { name: "Crypt of the NecroDancer", revenue: "$20M+", downloads: "5M+" }
    ],
    whyNow: "Hades 2 hype, procedural music AI viable",
    buildEstimateHours: 200,
    techStack: "Unity + FMOD",
    monetization: "Premium $19.99 + Soundtrack DLC",
    distributionPlan: "Steam Next Fest, rhythm YouTubers",
    scoreMarket: 19, scoreDifficulty: 14, scoreCompetition: 21, scoreMonetization: 12, scoreTiming: 9,
  },
  {
    slug: "pet-battle-autobattler",
    title: "Critter Clash",
    genre: "Auto Battler / Pet Collection",
    platform: Platform.mobile,
    hook: "Pokemon meets Teamfight Tactics — collect, position, win",
    problem: "Auto battlers complex. Pet games lack depth. Combine = casual depth",
    opportunity: "Auto battler $1B+. Pet collection evergreen",
    marketSize: "Auto battlers: $1B+, Pet collection: $2B+",
    targetAudience: "TFT players, Pokemon fans wanting strategy",
    competitionAnalysis: "TFT complex. No cute + casual + strategic mobile",
    similarGames: [
      { name: "Teamfight Tactics", revenue: "$200M+", downloads: "50M+" },
      { name: "Pokemon Unite", revenue: "$100M+", downloads: "80M+" }
    ],
    whyNow: "Axie collapse left void, Palworld proved pet hunger",
    buildEstimateHours: 160,
    techStack: "Unity + PlayFab",
    monetization: "F2P gacha + Battle Pass $9.99/season",
    distributionPlan: "TikTok reveals, auto battler streamers",
    scoreMarket: 22, scoreDifficulty: 15, scoreCompetition: 20, scoreMonetization: 14, scoreTiming: 8,
  },
  {
    slug: "sleep-adventure",
    title: "Dreamwalker",
    genre: "Idle / Adventure",
    platform: Platform.mobile,
    hook: "Progress only while you sleep — hero adventures through dreams",
    problem: "Sleep apps boring. Games keep you awake. Combine = healthy gaming",
    opportunity: "Sleep apps $2B+. Idle $2B+",
    marketSize: "Sleep/wellness: $2B+, Idle: $2B+",
    targetAudience: "Sleep-conscious adults, idle gamers",
    competitionAnalysis: "Pokemon Sleep limited gameplay. Gap: actual game mechanics",
    similarGames: [
      { name: "Pokemon Sleep", revenue: "$100M+", downloads: "20M+" },
      { name: "Idle Heroes", revenue: "$500M+", downloads: "50M+" }
    ],
    whyNow: "Pokemon Sleep proved concept, wellness gaming maturing",
    buildEstimateHours: 120,
    techStack: "React Native + HealthKit",
    monetization: "Premium insights $4.99/mo + World expansions IAP",
    distributionPlan: "Wellness influencers, r/sleep",
    scoreMarket: 21, scoreDifficulty: 17, scoreCompetition: 22, scoreMonetization: 13, scoreTiming: 10,
  },
  {
    slug: "micro-city-builder",
    title: "Tiny Towns",
    genre: "Puzzle / City Builder",
    platform: Platform.mobile,
    hook: "Build a city in 5 minutes — bite-sized city planning",
    problem: "City builders require hours. Mobile versions are P2W grinders",
    opportunity: "Mini Motorways proved micro-strategy works",
    marketSize: "City builder: $1B+, Puzzle: $8B+",
    targetAudience: "Puzzle gamers, lapsed city builder fans",
    competitionAnalysis: "SimCity BuildIt F2P grind. Gap: quick session builder",
    similarGames: [
      { name: "Mini Motorways", revenue: "$20M+", downloads: "5M+" },
      { name: "Islanders", revenue: "$5M+", downloads: "2M+" }
    ],
    whyNow: "Mobile city builder market underserved",
    buildEstimateHours: 100,
    techStack: "Unity + Firebase",
    monetization: "Premium $3.99 + hint IAP",
    distributionPlan: "Apple Arcade pitch, city builder YouTubers",
    scoreMarket: 21, scoreDifficulty: 21, scoreCompetition: 22, scoreMonetization: 12, scoreTiming: 8,
  },
  {
    slug: "cooking-tower-defense",
    title: "Kitchen Siege",
    genre: "Tower Defense / Cooking",
    platform: Platform.mobile,
    hook: "Place dishes as towers to satisfy hungry customers",
    problem: "Cooking = time management. TD = strategy. Combine for unique loop",
    opportunity: "Cooking games $1B+. TD $800M. Hybrid = blue ocean",
    marketSize: "Cooking: $1B+, TD: $800M",
    targetAudience: "Cooking game fans, TD strategists",
    competitionAnalysis: "No cooking TD hybrid exists",
    similarGames: [
      { name: "Overcooked", revenue: "$100M+", downloads: "10M+" },
      { name: "Kingdom Rush", revenue: "$30M+", downloads: "50M+" }
    ],
    whyNow: "Cooking content viral, TD needs innovation",
    buildEstimateHours: 130,
    techStack: "Unity + Firebase",
    monetization: "F2P + Recipe book IAP ($2.99-$9.99)",
    distributionPlan: "Food TikTok, casual game influencers",
    scoreMarket: 20, scoreDifficulty: 18, scoreCompetition: 24, scoreMonetization: 13, scoreTiming: 7,
  },
  {
    slug: "idle-fc",
    title: "Idle FC",
    genre: "Idle / Sports Management",
    platform: Platform.mobile,
    hook: "Football Manager meets idle — build dynasty while AFK",
    problem: "Sports management requires hours. Idle games lack sports theme",
    opportunity: "Sports $15B+. Idle $2B+. Idle sports = white space",
    marketSize: "Sports: $15B+, Idle: $2B+",
    targetAudience: "Football fans, FM players without time",
    competitionAnalysis: "No idle-first sports management",
    similarGames: [
      { name: "Football Manager", revenue: "$100M+", downloads: "10M+" },
      { name: "Idle Miner Tycoon", revenue: "$150M+", downloads: "100M+" }
    ],
    whyNow: "World Cup cycle, FM mobile disappoints casuals",
    buildEstimateHours: 120,
    techStack: "Unity + Firebase + AdMob",
    monetization: "Ads + VIP subscription $4.99/mo",
    distributionPlan: "Football Twitter, r/footballmanagergames",
    scoreMarket: 23, scoreDifficulty: 19, scoreCompetition: 24, scoreMonetization: 14, scoreTiming: 9,
  },
  {
    slug: "music-merge",
    title: "Melody Merge",
    genre: "Merge / Music",
    platform: Platform.mobile,
    hook: "Merge instruments to compose symphonies",
    problem: "Merge games visual-only. Music games require skill. Combine = accessible",
    opportunity: "Merge $3B+. Music $3B+. Hybrid untapped",
    marketSize: "Merge: $3B+, Music: $3B+",
    targetAudience: "Merge addicts, music lovers, ASMR seekers",
    competitionAnalysis: "No merge-to-music game",
    similarGames: [
      { name: "Merge Mansion", revenue: "$500M+", downloads: "50M+" },
      { name: "Incredibox", revenue: "$20M+", downloads: "10M+" }
    ],
    whyNow: "Merge saturated needs innovation, lo-fi culture huge",
    buildEstimateHours: 100,
    techStack: "Unity + FMOD + AdMob",
    monetization: "F2P ads + Instrument packs IAP",
    distributionPlan: "ASMR TikTok, lo-fi communities",
    scoreMarket: 22, scoreDifficulty: 20, scoreCompetition: 23, scoreMonetization: 13, scoreTiming: 8,
  },
]

export async function POST(request: NextRequest) {
  // Allow seeding with secret key (one-time setup)
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  
  if (secret !== process.env.NEXTAUTH_SECRET) {
    const session = await auth()
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }
  
  const results = []
  
  for (const idea of ideas) {
    try {
      const created = await prisma.idea.create({
        data: {
          ...idea,
          similarGames: idea.similarGames,
          isDraft: false,
          publishedAt: new Date(),
          featuredDate: idea.slug === 'idle-fossil-hunter' ? new Date() : null,
        },
      })
      results.push({ success: true, title: created.title })
    } catch (error: any) {
      if (error.code === 'P2002') {
        results.push({ success: false, title: idea.title, error: 'Already exists' })
      } else {
        results.push({ success: false, title: idea.title, error: error.message })
      }
    }
  }
  
  return NextResponse.json({ 
    message: `Seeded ${results.filter(r => r.success).length} ideas`,
    results 
  })
}
