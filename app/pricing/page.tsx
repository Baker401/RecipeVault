"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ChefHat, Check, ArrowLeft, Users, BookOpen, MessageSquare, Calculator, Shield, Headphones } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small restaurants and cafes",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "Up to 5 employees",
        "100 recipes",
        "Basic measurement converter",
        "Recipe notes & feedback",
        "Email support",
        "Mobile app access",
      ],
      popular: false,
      color: "slate",
    },
    {
      name: "Professional",
      description: "Ideal for growing restaurant groups",
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        "Up to 25 employees",
        "Unlimited recipes",
        "Advanced measurement converter",
        "Recipe notes & feedback",
        "Priority email support",
        "Mobile app access",
        "Recipe categories & tags",
        "Employee activity tracking",
        "Export recipes (PDF)",
      ],
      popular: true,
      color: "red",
    },
    {
      name: "Enterprise",
      description: "For large restaurant chains and franchises",
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        "Unlimited employees",
        "Unlimited recipes",
        "Advanced measurement converter",
        "Recipe notes & feedback",
        "24/7 phone & email support",
        "Mobile app access",
        "Recipe categories & tags",
        "Employee activity tracking",
        "Export recipes (PDF)",
        "Custom integrations",
        "Advanced analytics",
        "Dedicated account manager",
        "Custom training sessions",
      ],
      popular: false,
      color: "yellow",
    },
  ]

  const features = [
    {
      icon: Users,
      title: "Team Management",
      description: "Add and manage employees with role-based access controls",
    },
    {
      icon: BookOpen,
      title: "Recipe Organization",
      description: "Organize recipes by categories, difficulty, and cooking time",
    },
    {
      icon: MessageSquare,
      title: "Feedback System",
      description: "Collect and manage feedback from your kitchen staff",
    },
    {
      icon: Calculator,
      title: "Measurement Tools",
      description: "Convert between different measurement units instantly",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Get help from our culinary technology experts",
    },
  ]

  const getPrice = (plan: (typeof plans)[0]) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice
  }

  const getSavings = (plan: (typeof plans)[0]) => {
    const monthlyCost = plan.monthlyPrice * 12
    const annualCost = plan.annualPrice
    return monthlyCost - annualCost
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <ChefHat className="h-8 w-8 text-yellow-600 mr-3" />
              <span className="text-2xl font-bold text-white">RecipeVault</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent">
                  Contact
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-red-600 hover:bg-red-700 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your kitchen. All plans include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-lg ${!isAnnual ? "text-white" : "text-gray-400"}`}>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-red-600" />
            <span className={`text-lg ${isAnnual ? "text-white" : "text-gray-400"}`}>Annual</span>
            <Badge className="bg-green-600 text-white ml-2">Save up to 17%</Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`bg-slate-800 border-slate-700 relative ${
                plan.popular ? "ring-2 ring-red-600 scale-105" : ""
              } hover:bg-slate-750 transition-all duration-300`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-gray-300 mb-4">{plan.description}</CardDescription>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${getPrice(plan)}</span>
                  <span className="text-gray-400">/{isAnnual ? "year" : "month"}</span>
                </div>

                {isAnnual && <div className="text-green-400 text-sm">Save ${getSavings(plan)} per year</div>}
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-red-600 hover:bg-red-700" : "bg-slate-700 hover:bg-slate-600"
                    } text-white`}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              All plans include these powerful features to help you manage your kitchen operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-red-600/20 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Is there a free trial?</h3>
              <p className="text-gray-300">
                Yes, all plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-300">
                We accept all major credit cards, PayPal, and can arrange invoicing for Enterprise customers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Is my data secure?</h3>
              <p className="text-gray-300">
                Absolutely. We use enterprise-grade encryption and security measures to protect your recipes and data.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-red-600/20 to-yellow-600/20 border-red-600/30 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of culinary professionals who trust RecipeVault to manage their kitchen operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                    Start Your Free Trial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent px-8 py-4 text-lg"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
              <p className="text-gray-400 text-sm mt-4">14-day free trial • No credit card required • Cancel anytime</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
