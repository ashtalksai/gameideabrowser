import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function calculateTotalScore(idea: {
  scoreMarket: number
  scoreDifficulty: number
  scoreCompetition: number
  scoreMonetization: number
  scoreTiming: number
}): number {
  return (
    idea.scoreMarket +
    idea.scoreDifficulty +
    idea.scoreCompetition +
    idea.scoreMonetization +
    idea.scoreTiming
  )
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
