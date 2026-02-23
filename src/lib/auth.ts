import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Resend from "@auth/core/providers/resend"
import { prisma } from "./db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: "GameIdeaBrowser <noreply@gameideabrowser.com>",
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/verify-request',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { plan: true, isAdmin: true }
        })
        session.user.id = user.id
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
