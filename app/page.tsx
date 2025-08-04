"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Users, Calculator, MessageSquare, Shield, Clock, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const features = [
    {
      icon: Users,
      title: "Multi-Organization Support",
      description: "Manage multiple organizations with separate recipe collections and employee access controls.",
    },
    {
      icon: ChefHat,
      title: "Recipe Management",
      description: "Create, edit, and organize professional recipes with detailed ingredients and instructions.",
    },
    {
      icon: Calculator,
      title: "Measurement Converter",
      description: "Built-in calculator for converting between different measurement units instantly.",
    },
    {
      icon: MessageSquare,
      title: "Recipe Feedback",
      description: "Employees can send notes and feedback about recipes directly to organization admins.",
    },
    {
      icon: Shield,
      title: "Secure Access Control",
      description: "Role-based permissions ensure only authorized users can access and modify recipes.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Changes to recipes and notes are updated in real-time across your organization.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Executive Chef",
      company: "Fine Dining Co.",
      content:
        "RecipeVault has revolutionized how we manage our kitchen operations. The measurement converter alone saves us hours every week.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Restaurant Manager",
      company: "Gourmet Bistro",
      content:
        "The multi-organization feature is perfect for our restaurant group. We can maintain consistency across all locations.",
      rating: 5,
    },
    {
      name: "Emily Chen",
      role: "Head Baker",
      company: "Artisan Bakery",
      content: "The feedback system helps us continuously improve our recipes. Our team loves how easy it is to use.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-yellow-600 mr-3" />
              <span className="text-2xl font-bold text-white">RecipeVault</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                Testimonials
              </a>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/auth">
                <Button variant="outline" className="text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-red-600 hover:bg-red-700 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30 mb-6">
            Professional Recipe Management
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Manage Your Kitchen
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500"> Recipes</span>
            <br />
            Like a Pro
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            RecipeVault is the complete solution for professional kitchens. Organize recipes, manage teams, convert
            measurements, and gather feedback - all in one powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent px-8 py-4 text-lg"
            >
              Watch Demo
            </Button>
          </div>
          <p className="text-gray-400 text-sm mt-4">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features designed specifically for professional kitchens and culinary teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-red-600 mb-4" />
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-500 mb-2">500+</div>
              <div className="text-gray-300">Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-500 mb-2">10K+</div>
              <div className="text-gray-300">Recipes Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-500 mb-2">25K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-500 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Loved by Culinary Professionals</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See what chefs and kitchen managers are saying about RecipeVault.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-sm text-yellow-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="bg-gradient-to-r from-red-600/20 to-yellow-600/20 border-red-600/30 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Kitchen?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of culinary professionals who trust RecipeVault to manage their recipes and teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent px-8 py-4 text-lg"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <ChefHat className="h-8 w-8 text-yellow-600 mr-3" />
                <span className="text-xl font-bold text-white">RecipeVault</span>
              </div>
              <p className="text-gray-400">Professional recipe management for modern kitchens.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RecipeVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
