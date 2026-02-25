import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — GameIdeaBrowser",
  description: "Privacy Policy for GameIdeaBrowser",
}

export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl prose prose-gray dark:prose-invert">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: February 2026</p>
          
          <section className="mt-8">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p>
              GameIdeaBrowser ("we", "our", "us") respects your privacy. This policy explains 
              what information we collect, how we use it, and your rights regarding your data.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            
            <h3 className="text-lg font-medium mt-4">Account Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address (required for account creation)</li>
              <li>Name (optional)</li>
              <li>Subscription status and billing history</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4">Usage Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ideas viewed and saved</li>
              <li>Login timestamps and session data</li>
              <li>Browser type and device information</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4">Payment Information</h3>
            <p>
              Payment processing is handled by Stripe. We do not store your credit card 
              numbers or bank details on our servers. Stripe's privacy policy governs 
              their handling of your payment information.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain the Service</li>
              <li>To process subscriptions and payments</li>
              <li>To send transactional emails (login, receipts, subscription changes)</li>
              <li>To send our weekly digest email (Pro subscribers, can unsubscribe)</li>
              <li>To improve the Service based on usage patterns</li>
              <li>To respond to support requests</li>
            </ul>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Data Sharing</h2>
            <p>We do not sell your personal information. We share data only with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Stripe</strong> — Payment processing</li>
              <li><strong>Resend</strong> — Email delivery</li>
              <li><strong>Vercel/Coolify</strong> — Hosting infrastructure</li>
            </ul>
            <p className="mt-2">
              We may disclose information if required by law or to protect our rights.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Cookies</h2>
            <p>
              We use essential cookies for authentication and session management. 
              We do not use tracking cookies or third-party advertising cookies.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Data Retention</h2>
            <p>
              We retain your account information as long as your account is active. 
              If you delete your account, we will delete your personal data within 30 days, 
              except where we need to retain it for legal or accounting purposes.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Export your data</li>
              <li>Opt out of marketing emails</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@gameideabrowser.com" className="text-primary hover:underline">
                privacy@gameideabrowser.com
              </a>
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Security</h2>
            <p>
              We use industry-standard security measures including HTTPS encryption, 
              secure authentication, and regular security reviews. However, no system 
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Children's Privacy</h2>
            <p>
              The Service is not intended for users under 13 years of age. We do not 
              knowingly collect information from children under 13.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Material changes will be 
              communicated via email. Your continued use of the Service constitutes 
              acceptance of the updated policy.
            </p>
          </section>
          
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p>
              For privacy-related questions:{" "}
              <a href="mailto:privacy@gameideabrowser.com" className="text-primary hover:underline">
                privacy@gameideabrowser.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
