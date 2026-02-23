"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { slugify } from "@/lib/utils"

const genres = [
  "Puzzle", "Idle", "Party", "Cozy", "Daily Challenge", 
  "Narrative", "Multiplayer", "Hypercasual", "Arcade", "Strategy"
]

const platforms = [
  { value: "mobile", label: "📱 Mobile" },
  { value: "web", label: "🌐 Web" },
  { value: "desktop", label: "🖥️ Desktop" },
  { value: "both", label: "🎮 Cross-platform" },
]

export default function NewIdeaPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isAiLoading, setIsAiLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: "",
    genre: "Puzzle",
    platform: "mobile",
    hook: "",
    problem: "",
    marketSize: "",
    targetAudience: "",
    competitionAnalysis: "",
    similarGames: "",
    whyNow: "",
    buildEstimateHours: "",
    techStack: "",
    monetization: "",
    distributionPlan: "",
    scoreMarket: "20",
    scoreDifficulty: "15",
    scoreCompetition: "20",
    scoreMonetization: "12",
    scoreTiming: "7",
  })
  
  function updateField(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  async function handleAiAssist() {
    if (!formData.title || !formData.hook || !formData.problem) {
      alert("Please fill in title, hook, and problem first")
      return
    }
    
    setIsAiLoading(true)
    
    try {
      const response = await fetch("/api/admin/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          genre: formData.genre,
          hook: formData.hook,
          problem: formData.problem,
        }),
      })
      
      if (!response.ok) throw new Error("AI assist failed")
      
      const data = await response.json()
      
      setFormData(prev => ({
        ...prev,
        marketSize: data.marketSize || prev.marketSize,
        targetAudience: data.targetAudience || prev.targetAudience,
        competitionAnalysis: data.competitionAnalysis || prev.competitionAnalysis,
        similarGames: data.similarGames ? JSON.stringify(data.similarGames, null, 2) : prev.similarGames,
        whyNow: data.whyNow || prev.whyNow,
        techStack: data.techStack || prev.techStack,
        monetization: data.monetization || prev.monetization,
        distributionPlan: data.distributionPlan || prev.distributionPlan,
        buildEstimateHours: data.buildEstimateHours?.toString() || prev.buildEstimateHours,
      }))
    } catch (error) {
      console.error("AI assist error:", error)
      alert("AI assist failed. Please try again.")
    } finally {
      setIsAiLoading(false)
    }
  }
  
  async function handleSubmit(e: React.FormEvent, publish: boolean = false) {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      let similarGamesJson = null
      if (formData.similarGames) {
        try {
          similarGamesJson = JSON.parse(formData.similarGames)
        } catch {
          similarGamesJson = formData.similarGames.split('\n').map(g => ({ name: g.trim() }))
        }
      }
      
      const response = await fetch("/api/admin/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: slugify(formData.title),
          buildEstimateHours: parseInt(formData.buildEstimateHours) || null,
          similarGames: similarGamesJson,
          scoreMarket: parseInt(formData.scoreMarket),
          scoreDifficulty: parseInt(formData.scoreDifficulty),
          scoreCompetition: parseInt(formData.scoreCompetition),
          scoreMonetization: parseInt(formData.scoreMonetization),
          scoreTiming: parseInt(formData.scoreTiming),
          isDraft: !publish,
          publishedAt: publish ? new Date().toISOString() : null,
        }),
      })
      
      if (!response.ok) throw new Error("Failed to save")
      
      router.push("/admin")
      router.refresh()
    } catch (error) {
      console.error("Save error:", error)
      alert("Failed to save. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  
  const totalScore = 
    parseInt(formData.scoreMarket) + 
    parseInt(formData.scoreDifficulty) + 
    parseInt(formData.scoreCompetition) + 
    parseInt(formData.scoreMonetization) + 
    parseInt(formData.scoreTiming)
  
  return (
    <div className="py-8">
      <div className="container max-w-3xl">
        <Link 
          href="/admin" 
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Admin
        </Link>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>New Idea</CardTitle>
            <Button 
              variant="outline" 
              onClick={handleAiAssist}
              disabled={isAiLoading}
            >
              {isAiLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              AI Assist
            </Button>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Drift Sort"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Genre *</label>
                    <select
                      value={formData.genre}
                      onChange={(e) => updateField("genre", e.target.value)}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                    >
                      {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform *</label>
                    <select
                      value={formData.platform}
                      onChange={(e) => updateField("platform", e.target.value)}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                    >
                      {platforms.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Hook (one-liner) *</label>
                <Input
                  value={formData.hook}
                  onChange={(e) => updateField("hook", e.target.value)}
                  placeholder="Tile-sorting game with ice physics drift mechanic"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Problem *</label>
                <Textarea
                  value={formData.problem}
                  onChange={(e) => updateField("problem", e.target.value)}
                  placeholder="What gap does this fill?"
                  rows={3}
                  required
                />
              </div>
              
              <hr />
              <p className="text-sm text-muted-foreground">
                Fill the fields below manually or click "AI Assist" after filling title, hook, and problem.
              </p>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Market Size</label>
                <Textarea
                  value={formData.marketSize}
                  onChange={(e) => updateField("marketSize", e.target.value)}
                  placeholder="$4.2B casual puzzle market, 14.3% CAGR"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <Input
                  value={formData.targetAudience}
                  onChange={(e) => updateField("targetAudience", e.target.value)}
                  placeholder="Women 25-44, casual mobile gamers"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Similar Games (JSON or one per line)</label>
                <Textarea
                  value={formData.similarGames}
                  onChange={(e) => updateField("similarGames", e.target.value)}
                  placeholder='[{"name": "Wool Sort", "downloads": "50M", "revenue": "$10M"}]'
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Competition Analysis</label>
                <Textarea
                  value={formData.competitionAnalysis}
                  onChange={(e) => updateField("competitionAnalysis", e.target.value)}
                  placeholder="Gap analysis..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Why Now</label>
                <Textarea
                  value={formData.whyNow}
                  onChange={(e) => updateField("whyNow", e.target.value)}
                  placeholder="Timing factors..."
                  rows={3}
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Build Estimate (hours)</label>
                  <Input
                    type="number"
                    value={formData.buildEstimateHours}
                    onChange={(e) => updateField("buildEstimateHours", e.target.value)}
                    placeholder="40"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tech Stack</label>
                  <Input
                    value={formData.techStack}
                    onChange={(e) => updateField("techStack", e.target.value)}
                    placeholder="Unity / Godot / HTML5"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Monetization</label>
                <Textarea
                  value={formData.monetization}
                  onChange={(e) => updateField("monetization", e.target.value)}
                  placeholder="F2P + ads, optional IAP..."
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Distribution Plan</label>
                <Textarea
                  value={formData.distributionPlan}
                  onChange={(e) => updateField("distributionPlan", e.target.value)}
                  placeholder="Launch channels..."
                  rows={2}
                />
              </div>
              
              <hr />
              
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium">Scores</label>
                  <span className="text-lg font-bold">Total: {totalScore}/100</span>
                </div>
                <div className="grid gap-4 md:grid-cols-5">
                  <div className="space-y-1">
                    <label className="text-xs">Market (0-25)</label>
                    <Input
                      type="number"
                      min="0" max="25"
                      value={formData.scoreMarket}
                      onChange={(e) => updateField("scoreMarket", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs">Difficulty (0-25)</label>
                    <Input
                      type="number"
                      min="0" max="25"
                      value={formData.scoreDifficulty}
                      onChange={(e) => updateField("scoreDifficulty", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs">Competition (0-25)</label>
                    <Input
                      type="number"
                      min="0" max="25"
                      value={formData.scoreCompetition}
                      onChange={(e) => updateField("scoreCompetition", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs">Monetization (0-15)</label>
                    <Input
                      type="number"
                      min="0" max="15"
                      value={formData.scoreMonetization}
                      onChange={(e) => updateField("scoreMonetization", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs">Timing (0-10)</label>
                    <Input
                      type="number"
                      min="0" max="10"
                      value={formData.scoreTiming}
                      onChange={(e) => updateField("scoreTiming", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button type="submit" variant="outline" disabled={isLoading}>
                  Save Draft
                </Button>
                <Button 
                  type="button" 
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={isLoading}
                >
                  Publish Now
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
