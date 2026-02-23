export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { IdeaCard } from "@/components/idea-card"

async function getIdeas() {
  try {
    return await prisma.idea.findMany({
      where: {
        isDraft: false,
        publishedAt: {
          lte: new Date(),
        },
      },
      orderBy: [
        { featuredDate: 'desc' },
        { publishedAt: 'desc' },
      ],
    })
  } catch {
    return []
  }
}

export default async function IdeasPage() {
  const session = await auth()
  const ideas = await getIdeas()
  const isPro = session?.user?.plan === 'pro' || session?.user?.plan === 'lifetime'
  
  return (
    <div className="py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Ideas</h1>
          <p className="mt-2 text-muted-foreground">
            {ideas.length} research-backed game concepts
          </p>
        </div>
        
        {ideas.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground">
              No ideas published yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
              <IdeaCard 
                key={idea.id} 
                idea={idea} 
                isLocked={!isPro}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
