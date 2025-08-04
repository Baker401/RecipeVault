"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Search, Plus, Edit, Trash2, Clock, Users, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const recipes = [
    {
      id: 1,
      name: "Classic Chocolate Chip Cookies",
      category: "Desserts",
      prepTime: "15 min",
      cookTime: "12 min",
      servings: 24,
      difficulty: "Easy",
      notes: 3,
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      name: "Pasta Carbonara",
      category: "Main Course",
      prepTime: "10 min",
      cookTime: "15 min",
      servings: 4,
      difficulty: "Medium",
      notes: 5,
      lastUpdated: "1 week ago",
    },
    {
      id: 3,
      name: "Caesar Salad",
      category: "Salads",
      prepTime: "20 min",
      cookTime: "0 min",
      servings: 6,
      difficulty: "Easy",
      notes: 2,
      lastUpdated: "3 days ago",
    },
    {
      id: 4,
      name: "Beef Wellington",
      category: "Main Course",
      prepTime: "45 min",
      cookTime: "40 min",
      servings: 8,
      difficulty: "Hard",
      notes: 1,
      lastUpdated: "1 day ago",
    },
  ]

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="flex items-center mr-6">
                <ChefHat className="h-8 w-8 text-yellow-600 mr-3" />
                <h1 className="text-2xl font-bold text-white">Recipe Management</h1>
              </Link>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Recipe
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{recipe.name}</CardTitle>
                    <CardDescription className="text-gray-300">{recipe.category}</CardDescription>
                  </div>
                  <Badge className={`${getDifficultyColor(recipe.difficulty)} text-white`}>{recipe.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Recipe Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-1 text-yellow-600" />
                      Prep: {recipe.prepTime}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-1 text-red-600" />
                      Cook: {recipe.cookTime}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="h-4 w-4 mr-1 text-yellow-600" />
                      Serves: {recipe.servings}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MessageSquare className="h-4 w-4 mr-1 text-red-600" />
                      Notes: {recipe.notes}
                    </div>
                  </div>

                  {/* Last Updated */}
                  <p className="text-xs text-gray-400">Updated {recipe.lastUpdated}</p>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Notes
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No recipes found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first recipe"}
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Recipe
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
