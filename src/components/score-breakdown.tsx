import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ScoreBreakdownProps {
  scores: {
    scoreMarket: number
    scoreDifficulty: number
    scoreCompetition: number
    scoreMonetization: number
    scoreTiming: number
  }
  className?: string
}

const scoreConfig = [
  { key: 'scoreMarket', label: 'Market Opportunity', max: 25, color: 'bg-blue-500' },
  { key: 'scoreDifficulty', label: 'Build Difficulty', max: 25, color: 'bg-amber-500' },
  { key: 'scoreCompetition', label: 'Competition Gap', max: 25, color: 'bg-green-500' },
  { key: 'scoreMonetization', label: 'Monetization', max: 15, color: 'bg-teal-500' },
  { key: 'scoreTiming', label: 'Timing', max: 10, color: 'bg-purple-500' },
] as const

export function ScoreBreakdown({ scores, className }: ScoreBreakdownProps) {
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Score Breakdown
        </h3>
        <div className="rounded-full bg-primary px-3 py-1">
          <span className="font-mono text-lg font-bold text-primary-foreground">
            {totalScore}/100
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {scoreConfig.map(({ key, label, max, color }) => {
          const value = scores[key]
          const difficulty = key === 'scoreDifficulty'
          const difficultyLabel = difficulty 
            ? value < 10 ? 'Easy' : value < 18 ? 'Moderate' : 'Hard'
            : null
          
          return (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {label}
                  {difficultyLabel && (
                    <span className="ml-2 text-xs text-muted-foreground/70">
                      — {difficultyLabel}
                    </span>
                  )}
                </span>
                <span className="font-mono font-medium">{value}/{max}</span>
              </div>
              <Progress 
                value={value} 
                max={max} 
                indicatorClassName={color}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
