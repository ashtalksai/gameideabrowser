import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service — GameIdeaBrowser",
  description: "Terms of Service for GameIdeaBrowser",
}

export default function TermsPage() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl prose prose-gray dark:prose-invert">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: February 2026</p>
          
          <section className="mt-8">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing and using GameIdeaBrowser ("Service"), you agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">2. Description of Service</h2>
            <p>
              GameIdeaBrowser provides research-backed game concept ideas for indie developers. 
              The Service includes access to a database of game ideas with market analysis, 
              competition data, build estimates, and other research information.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">3. Subscription and Payments</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free tier: Limited access to daily ideas (title, hook, and score only)</li>
              <li>Pro ($19/month): Full database access with all research data</li>
              <li>Lifetime ($149 one-time): Permanent Pro access, limited to 200 seats</li>
            </ul>
            <p className="mt-4">
              Payments are processed securely through Stripe. Pro subscriptions can be 
              cancelled at any time. Lifetime purchases are non-refundable after 30 days.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
            <p>
              Game ideas provided through the Service are for your personal or commercial use. 
              You may build games based on any idea from our database. However, the research 
              content, analysis, and presentation remain the property of GameIdeaBrowser.
            </p>
            <p className="mt-2">
              You may not resell, redistribute, or republish our idea database or research 
              content without explicit written permission.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">5. No Guarantees</h2>
            <p>
              The game ideas and market research provided are for informational purposes only. 
              We do not guarantee:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The commercial success of any game built from our ideas</li>
              <li>The accuracy of market data or revenue projections</li>
              <li>Exclusivity of any idea — others may build similar games</li>
            </ul>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">6. Account Responsibilities</h2>
            <p>
              You are responsible for maintaining the security of your account credentials. 
              Account sharing is not permitted. Each subscription is for a single user.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">7. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the 
              Service after changes constitutes acceptance of the new terms. Material changes 
              will be communicated via email.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">8. Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a href="mailto:support@gameideabrowser.com" className="text-primary hover:underline">
                support@gameideabrowser.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
