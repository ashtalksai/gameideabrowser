import Link from "next/link"
import { redirect } from "next/navigation"
import { Plus, Edit, Calendar, FileText } from "lucide-react"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate, calculateTotalScore } from "@/lib/utils"

async function getIdeasByStatus() {
  const ideas = await prisma.idea.findMany({
    orderBy: { createdAt: 'desc' },
  })
  
  const drafts = ideas.filter(i => i.isDraft)
  const scheduled = ideas.filter(i => !i.isDraft && i.publishedAt && i.publishedAt > new Date())
  const published = ideas.filter(i => !i.isDraft && i.publishedAt && i.publishedAt <= new Date())
  
  return { drafts, scheduled, published, total: ideas.length }
}

export default async function AdminPage() {
  const session = await auth()
  
  if (!session?.user?.isAdmin) {
    redirect("/")
  }
  
  const { drafts, scheduled, published, total } = await getIdeasByStatus()
  
  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">{total} ideas total</p>
          </div>
          <Link href="/admin/ideas/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Idea
            </Button>
          </Link>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Drafts ({drafts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {drafts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No drafts</p>
              ) : (
                drafts.slice(0, 5).map(idea => (
                  <Link 
                    key={idea.id}
                    href={`/admin/ideas/${idea.id}`}
                    className="block rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{idea.title}</span>
                      <Badge variant="secondary">Draft</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {idea.genre} · Score: {calculateTotalScore(idea)}
                    </p>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Scheduled ({scheduled.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {scheduled.length === 0 ? (
                <p className="text-sm text-muted-foreground">No scheduled ideas</p>
              ) : (
                scheduled.slice(0, 5).map(idea => (
                  <Link 
                    key={idea.id}
                    href={`/admin/ideas/${idea.id}`}
                    className="block rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{idea.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {idea.publishedAt && formatDate(idea.publishedAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {idea.genre} · Score: {calculateTotalScore(idea)}
                    </p>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Edit className="h-4 w-4" />
                Published ({published.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {published.length === 0 ? (
                <p className="text-sm text-muted-foreground">No published ideas</p>
              ) : (
                published.slice(0, 5).map(idea => (
                  <Link 
                    key={idea.id}
                    href={`/admin/ideas/${idea.id}`}
                    className="block rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{idea.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {idea.publishedAt && formatDate(idea.publishedAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {idea.genre} · Score: {calculateTotalScore(idea)}
                    </p>
                  </Link>
                ))
              )}
              {published.length > 5 && (
                <Link 
                  href="/admin/ideas"
                  className="block text-center text-sm text-primary hover:underline"
                >
                  View all...
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
