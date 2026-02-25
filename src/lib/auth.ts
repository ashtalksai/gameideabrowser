import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "@auth/core/providers/credentials"
import { prisma } from "./db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string
        if (!email) return null
        
        // Find or create user
        let user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
          user = await prisma.user.create({
            data: { 
              id: crypto.randomUUID(),
              email,
              plan: 'free',
            }
          })
        }
        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign in, add user id to token
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        const userId = token.id as string
        const dbUser = await prisma.user.findUnique({
          where: { id: userId },
          select: { plan: true, isAdmin: true }
        })
        session.user.id = userId
        session.user.plan = dbUser?.plan || 'free'
        session.user.isAdmin = dbUser?.isAdmin || false
      }
      return session
    },
  },
})

// Type augmentation for session
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      plan: 'free' | 'pro' | 'lifetime'
      isAdmin: boolean
    }
  }
}
