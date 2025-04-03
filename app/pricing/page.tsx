import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Pricing - Coming Soon</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find Your Vibe is currently <span className="font-bold text-primary">free to use</span> while we're in our
          early stages.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-muted/30 rounded-lg p-8 text-center border border-primary/20">
        <Sparkles className="h-16 w-16 mx-auto mb-6 text-primary" />
        <h2 className="text-2xl font-bold mb-4">Early User Benefit</h2>
        <p className="text-lg mb-6">
          As a thank you for joining us early, all users who create an account during our free period will receive a
          special surprise when we launch our premium features!
        </p>
        <Button size="lg" className="mt-4">
          Sign Up Now
        </Button>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold mb-4">Want to know when pricing launches?</h3>
        <p className="text-muted-foreground mb-6">
          Subscribe to our newsletter to be the first to know about our pricing plans and special offers.
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-2 rounded-l-md border border-input"
          />
          <Button className="rounded-l-none">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

