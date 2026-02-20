import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleIdeas = [
  {
    slug: "drift-sort",
    title: "Drift Sort",
    genre: "Puzzle",
    platform: "mobile" as const,
    hook: "A tile-sorting game where pieces drift on ice physics.",
    problem: "Sorting puzzles dominate casual charts (Wool Sort: 50M+ DL) but all use static grid mechanics. Physics-based sorting is unseen.",
    marketSize: "Casual puzzle: $4.2B (2025), CAGR: 14.3% through 2030. Mobile share: 71%.",
    targetAudience: "Women 25-44, F2P mobile gamers",
    competitionAnalysis: "None use physics — patent risk low, mechanic is fresh.",
    similarGames: [
      { name: "Wool Sort", downloads: "~50M", rating: "★4.7" },
      { name: "Color Block", downloads: "~30M", rating: "★4.5" },
      { name: "Tile Puzzle", downloads: "~12M", rating: "★4.3" },
    ],
    whyNow: "Wool Sort formula proven. Unity physics easy to prototype in 48h. AppLovin ad platform makes UA cheap for puzzle games.",
    buildEstimateHours: 50,
    techStack: "Unity (physics native)",
    monetization: "F2P + ads (AdMob / AppLovin). Optional IAP: remove ads $2.99. Target: $0.04-0.08 eCPM mobile.",
    distributionPlan: "1. Soft launch Philippines/CA\n2. TikTok dev build videos\n3. Reddit r/casualgaming post\n4. AppLovin Exchange UA",
    scoreMarket: 20,
    scoreDifficulty: 20,
    scoreCompetition: 22,
    scoreMonetization: 12,
    scoreTiming: 7,
    isDraft: false,
    publishedAt: new Date(),
    featuredDate: new Date(),
  },
  {
    slug: "idle-kingdom-builder",
    title: "Idle Kingdom Builder",
    genre: "Idle",
    platform: "mobile" as const,
    hook: "Medieval city builder that plays itself. Check in twice a day, watch numbers go brrr.",
    problem: "Idle games have huge retention but most are boring visually. Medieval aesthetics + idle = untapped combo.",
    marketSize: "Idle/incremental games: $3.1B market, growing 18% YoY. Top idle games see 90-day retention of 15-20%.",
    targetAudience: "Men 25-45, commuters, busy professionals who want progression without active play",
    competitionAnalysis: "Cookie Clicker proved the concept. Realm Grinder added depth. No one has nailed 'cozy medieval idle' yet.",
    similarGames: [
      { name: "Realm Grinder", downloads: "~10M", revenue: "$2M/year" },
      { name: "Idle Miner Tycoon", downloads: "~50M", revenue: "$15M/year" },
      { name: "Adventure Capitalist", downloads: "~40M", revenue: "$8M/year" },
    ],
    whyNow: "Idle genre proven. Unity/Godot make it trivial to implement offline progress. Cozy game trend (Stardew, Animal Crossing) = aesthetic timing.",
    buildEstimateHours: 80,
    techStack: "Godot (lightweight, perfect for idle loops)",
    monetization: "IAP: time skips, premium currency, cosmetics. Target $0.02-0.05 ARPDAU.",
    distributionPlan: "1. Reddit r/incremental_games community launch\n2. iOS/Android soft launch\n3. TikTok 'number go up' content\n4. Cross-promo with other idle games",
    scoreMarket: 18,
    scoreDifficulty: 18,
    scoreCompetition: 20,
    scoreMonetization: 14,
    scoreTiming: 8,
    isDraft: false,
    publishedAt: new Date(Date.now() - 86400000),
  },
  {
    slug: "voice-king",
    title: "Voice King",
    genre: "Party",
    platform: "both" as const,
    hook: "Jackbox-style party game where players compete using voice commands and impressions.",
    problem: "Jackbox owns party games but has no voice-first game. Voice recognition is mature now. Untapped mechanic.",
    marketSize: "Party games: $2.8B, growing with group gaming resurgence post-pandemic. Jackbox alone: $50M+/year.",
    targetAudience: "Groups 4-8, ages 18-35, house parties, game nights, streamers",
    competitionAnalysis: "Jackbox has no voice game. Use Your Words is text-only. First-mover advantage possible.",
    similarGames: [
      { name: "Jackbox Party Pack", downloads: "N/A", revenue: "$50M+/year" },
      { name: "Among Us", downloads: "500M+", revenue: "$100M" },
      { name: "Use Your Words", downloads: "~1M", revenue: "$1M" },
    ],
    whyNow: "Web Speech API mature. Whisper (OpenAI) makes voice transcription free/cheap. Streaming culture = party game resurgence.",
    buildEstimateHours: 120,
    techStack: "Web (React + WebRTC + Whisper API)",
    monetization: "Premium game packs $4.99 each. Party pass subscription $9.99/month for all packs.",
    distributionPlan: "1. Twitch streamer partnerships\n2. TikTok clips of funny moments\n3. Product Hunt launch\n4. Reddit r/jackboxgames, r/partygames",
    scoreMarket: 22,
    scoreDifficulty: 12,
    scoreCompetition: 24,
    scoreMonetization: 10,
    scoreTiming: 8,
    isDraft: false,
    publishedAt: new Date(Date.now() - 172800000),
  },
  {
    slug: "cozy-cafe",
    title: "Cozy Café",
    genre: "Cozy",
    platform: "mobile" as const,
    hook: "Run a tiny café where the focus is ambiance, not stress. Lo-fi music, rain sounds, and gentle progression.",
    problem: "Restaurant games are all time-management stress. Where's the Stardew Valley of cafés?",
    marketSize: "Cozy games: fastest growing mobile segment, 24% CAGR. Stardew mobile: 3M+ copies.",
    targetAudience: "Women 20-40, stress-relief seekers, lo-fi music fans, ASMR community",
    competitionAnalysis: "All café games are Diner Dash clones. No one has made the 'cozy, non-stressful café' experience.",
    similarGames: [
      { name: "Good Pizza, Great Pizza", downloads: "~20M", rating: "★4.6" },
      { name: "Cats & Soup", downloads: "~10M", revenue: "$5M" },
      { name: "Stardew Valley", downloads: "~3M mobile", revenue: "$30M+" },
    ],
    whyNow: "Cozy game trend exploding. Lo-fi hip hop culture mainstream. Stress-relief gaming post-2020. ASMR content 10B+ views.",
    buildEstimateHours: 100,
    techStack: "Unity (2D, Spine animations for cozy characters)",
    monetization: "IAP: café decorations, seasonal content. No timers, no energy systems. Premium at $4.99 also viable.",
    distributionPlan: "1. TikTok ASMR/cozy content\n2. Lo-fi music YouTuber partnerships\n3. r/CozyGamers community\n4. iOS feature pitch (Apple loves cozy)",
    scoreMarket: 21,
    scoreDifficulty: 16,
    scoreCompetition: 22,
    scoreMonetization: 12,
    scoreTiming: 9,
    isDraft: false,
    publishedAt: new Date(Date.now() - 259200000),
  },
  {
    slug: "daily-word-maze",
    title: "Daily Word Maze",
    genre: "Daily Challenge",
    platform: "web" as const,
    hook: "Navigate a maze by spelling words. One puzzle per day. Share your path.",
    problem: "Wordle proved daily puzzles work. But what's next? Maze + words = unexplored combo.",
    marketSize: "Word games: $2.5B. Daily puzzle format: Wordle valued at $1M+ before NYT acquisition.",
    targetAudience: "Same as Wordle: educated adults 25-55, morning routine players",
    competitionAnalysis: "Wordle clones saturated. But maze mechanics are new. First to combine them wins.",
    similarGames: [
      { name: "Wordle", downloads: "N/A", notes: "~2M daily players, acquired by NYT" },
      { name: "Connections", downloads: "N/A", notes: "NYT, 1M+ daily" },
      { name: "Spelling Bee", downloads: "N/A", notes: "NYT, loyal daily players" },
    ],
    whyNow: "Daily puzzle habit established by Wordle. Social sharing mechanics proven. Web-first is lean to build.",
    buildEstimateHours: 30,
    techStack: "Next.js + Tailwind (web-first, no app stores)",
    monetization: "Free daily puzzle. Premium archive access $3.99/month. No ads.",
    distributionPlan: "1. Twitter/X word game community\n2. r/wordle, r/puzzles crossposts\n3. ProductHunt launch\n4. Newsletter signup for daily reminder",
    scoreMarket: 19,
    scoreDifficulty: 23,
    scoreCompetition: 18,
    scoreMonetization: 10,
    scoreTiming: 8,
    isDraft: false,
    publishedAt: new Date(Date.now() - 345600000),
  },
]

async function main() {
  console.log('Seeding database...')
  
  // Create admin user
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'ash@ashketing.com' },
    update: { isAdmin: true },
    create: {
      email: process.env.ADMIN_EMAIL || 'ash@ashketing.com',
      isAdmin: true,
      plan: 'lifetime',
    },
  })
  
  console.log('Created admin user')
  
  // Create sample ideas
  for (const idea of sampleIdeas) {
    await prisma.idea.upsert({
      where: { slug: idea.slug },
      update: idea,
      create: idea,
    })
    console.log(`Created idea: ${idea.title}`)
  }
  
  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
