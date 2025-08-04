"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState<"admin" | "employee">("admin")

  const handleAuth = () => {
    // Simulate authentication - in real app, this would handle actual auth
    if (userType === "admin") {
      window.location.href = "/admin/dashboard"
    } else {
      window.location.href = "/employee/dashboard"
    }
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
            <Link href="/">
              <Button variant="outline" className="text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{isLogin ? "Welcome Back" : "Get Started"}</h1>
          <p className="text-xl text-gray-300">
            {isLogin ? "Sign in to your RecipeVault account" : "Create your RecipeVault account"}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Users className="h-8 w-8 text-red-600 mb-2" />
              <CardTitle className="text-white">Multi-Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Manage multiple organizations with separate recipe collections and employee access.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <ChefHat className="h-8 w-8 text-yellow-600 mb-2" />
              <CardTitle className="text-white">Recipe Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Create, edit, and organize professional recipes with detailed instructions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Users className="h-8 w-8 text-red-600 mb-2" />
              <CardTitle className="text-white">Team Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Employees can send notes and feedback about recipes to organization admins.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Auth Form */}
        <div className="max-w-md mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-center">{isLogin ? "Sign In" : "Create Account"}</CardTitle>
              <CardDescription className="text-center text-gray-300">
                Access your recipe management system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={userType} onValueChange={(value) => setUserType(value as "admin" | "employee")}>
                <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                  <TabsTrigger value="admin" className="data-[state=active]:bg-red-600">
                    Organization Admin
                  </TabsTrigger>
                  <TabsTrigger value="employee" className="data-[state=active]:bg-yellow-600">
                    Employee
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                  />
                </div>

                {!isLogin && (
                  <>
                    <div>
                      <Label htmlFor="organization" className="text-gray-300">
                        {userType === "admin" ? "Organization Name" : "Organization Code"}
                      </Label>
                      <Input
                        id="organization"
                        placeholder={userType === "admin" ? "Your organization name" : "Enter organization code"}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="name" className="text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </>
                )}

                <Button
                  onClick={handleAuth}
                  className={`w-full ${userType === "admin" ? "bg-red-600 hover:bg-red-700" : "bg-yellow-600 hover:bg-yellow-700"} text-white`}
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>

                <div className="text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-gray-300 hover:text-white underline text-sm"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
