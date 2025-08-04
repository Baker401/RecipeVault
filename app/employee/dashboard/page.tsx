"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Search, BookOpen, MessageSquare, Calculator, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function EmployeeDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const recentRecipes = [
    {
      id: 1,
      name: "Classic Chocolate Chip Cookies",
      category: "Desserts",
      prepTime: "15 min",
      cookTime: "12 min",
      servings: 24,
      difficulty: "Easy",
      lastViewed: "2 hours ago",
    },
    {
      id: 2,
      name: "Pasta Carbonara",
      category: "Main Course",
      prepTime: "10 min",
      cookTime: "15 min",
      servings: 4,
      difficulty: "Medium",
      lastViewed: "1 day ago",
    },
    {
      id: 3,
      name: "Caesar Salad",
      category: "Salads",
      prepTime: "20 min",
      cookTime: "0 min",
      servings: 6,
      difficulty: "Easy",
      lastViewed: "3 days ago",
    },
  ]

  const myNotes = [
    {
      id: 1,
      recipe: "Chocolate Chip Cookies",
      note: "Could use a bit more vanilla extract for better flavor",
      status: "Pending",
      date: "2 days ago",
    },
    {
      id: 2,
      recipe: "Pasta Carbonara",
      note: "The cooking time seems a bit long, pasta was overcooked",
      status: "Reviewed",
      date: "1 week ago",
    },
  ]

  const stats = {
    recipesViewed: 45,
    notesSent: 8,
    favoriteRecipes: 12,
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-600"
      case "Medium":
        return "bg-yellow-600"
      case "Hard":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Pending" ? "bg-yellow-600" : "bg-green-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-yellow-600 mr-3" />
              <h1 className="text-2xl font-bold text-white">Employee Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                John Smith - Head Chef
              </Badge>
              <Link href="/converter">
                <Button variant="outline" className="text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent">
                  <Calculator className="h-4 w-4 mr-2" />
                  Converter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Recipes Viewed</CardTitle>
              <BookOpen className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.recipesViewed}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Notes Sent</CardTitle>
              <MessageSquare className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.notesSent}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Favorite Recipes</CardTitle>
              <ChefHat className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.favoriteRecipes}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Search and Recent */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Search Recipes</CardTitle>
                <CardDescription className="text-gray-300">
                  Find recipes from your organization's collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search for recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All Recipes
                </Button>
              </CardContent>
            </Card>

            {/* Recent Recipes */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recently Viewed Recipes</CardTitle>
                <CardDescription className="text-gray-300">Your recently accessed recipes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRecipes.map((recipe) => (
                    <div key={recipe.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{recipe.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-300 mt-1">
                          <span>{recipe.category}</span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {recipe.prepTime} + {recipe.cookTime}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            Serves {recipe.servings}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Last viewed {recipe.lastViewed}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getDifficultyColor(recipe.difficulty)} text-white`}>
                          {recipe.difficulty}
                        </Badge>
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Notes */}
          <div>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="h-5 w-5 text-yellow-600 mr-2" />
                  My Recipe Notes
                </CardTitle>
                <CardDescription className="text-gray-300">Feedback you've sent about recipes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myNotes.map((note) => (
                    <div key={note.id} className="p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-white text-sm">{note.recipe}</h4>
                        <Badge className={`${getStatusColor(note.status)} text-white text-xs`}>{note.status}</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{note.note}</p>
                      <p className="text-gray-400 text-xs">{note.date}</p>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send New Note
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800 border-slate-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/converter">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white justify-start">
                    <Calculator className="h-4 w-4 mr-2" />
                    Measurement Converter
                  </Button>
                </Link>
                <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Recipe Categories
                </Button>
                <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white justify-start">
                  <ChefHat className="h-4 w-4 mr-2" />
                  My Favorite Recipes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
