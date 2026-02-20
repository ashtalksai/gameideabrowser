import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  
  const plan = request.nextUrl.searchParams.get("plan")
  
  if (plan !== "pro" && plan !== "lifetime") {
    return NextResponse.redirect(new URL("/pricing", request.url))
  }
  
  // Get or create Stripe customer
  let user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  
  const stripe = getStripe()
  let customerId = user.stripeCustomerId
  
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      metadata: { userId: user.id },
    })
    customerId = customer.id
    
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    })
  }
  
  // Create checkout session
  const priceId = plan === "pro" 
    ? process.env.STRIPE_PRO_PRICE_ID 
    : process.env.STRIPE_LIFETIME_PRICE_ID
  
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: plan === "pro" ? "subscription" : "payment",
    success_url: `${request.nextUrl.origin}/ideas?success=true`,
    cancel_url: `${request.nextUrl.origin}/pricing`,
    metadata: {
      userId: user.id,
      plan,
    },
  })
  
  return NextResponse.redirect(checkoutSession.url!)
}
