import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Browse and discover",
    features: [
      "Idea of the Day preview",
      "Title + hook + score visible",
      "Browse all idea cards",
    ],
    cta: "Browse Ideas",
    href: "/ideas",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Full research access",
    features: [
      "Full database access",
      "Complete market data",
      "Competition analysis",
      "Build estimates & tech stack",
      "Distribution plans",
      "Daily new ideas",
      "Weekly digest email",
    ],
    cta: "Get Pro →",
    href: "/api/checkout?plan=pro",
    highlighted: true,
  },
  {
    name: "Lifetime",
    price: "$149",
    period: " once",
    description: "Never pay again",
    features: [
      "Everything in Pro",
      "No recurring charges",
      "Lifetime updates",
      "200 seats only",
    ],
    cta: "Get Lifetime →",
    href: "/api/checkout?plan=lifetime",
    highlighted: false,
    badge: "Limited",
  },
]

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold">Simple pricing</h1>
          <p className="mt-2 text-muted-foreground">
            One price, full access. Cancel anytime.
          </p>
        </div>
        
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={cn(
                "relative",
                plan.highlighted && "border-primary shadow-lg"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  asChild 
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <p className="mt-8 text-center text-sm text-muted-foreground">
          All plans: cancel anytime. No setup, no contracts.
        </p>
      </div>
    </div>
  )
}
