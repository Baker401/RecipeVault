"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Users, BookOpen, MessageSquare, Plus, Settings, Calculator } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats] = useState({
    totalRecipes: 156,
    totalEmployees: 23,
    pendingNotes: 8,
    activeOrganizations: 1,
  })

  const recentActivity = [
    { type: "recipe", action: "created", item: "Chocolate Chip Cookies", user: "Admin", time: "2 hours ago" },
    { type: "note", action: "received", item: "Pasta Carbonara feedback", user: "John Smith", time: "4 hours ago" },
    { type: "employee", action: "added", item: "Sarah Johnson", user: "Admin", time: "1 day ago" },
    { type: "recipe", action: "updated", item: "Caesar Salad", user: "Admin", time: "2 days ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-yellow-600 mr-3" />
              <h1 className="text-2xl font-bold text-white">RecipeVault Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                Gourmet Kitchen Co.
              </Badge>
              <Button variant="outline" className="text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Recipes</CardTitle>
              <BookOpen className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalRecipes}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Employees</CardTitle>
              <Users className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalEmployees}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Pending Notes</CardTitle>
              <MessageSquare className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.pendingNotes}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Organizations</CardTitle>
              <ChefHat className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeOrganizations}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/recipes">
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="h-5 w-5 text-red-600 mr-2" />
                  Manage Recipes
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Create, edit, and organize your recipe collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Recipe
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/employees">
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-5 w-5 text-yellow-600 mr-2" />
                  Manage Employees
                </CardTitle>
                <CardDescription className="text-gray-300">Add, remove, and manage employee access</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/converter">
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calculator className="h-5 w-5 text-red-600 mr-2" />
                  Measurement Converter
                </CardTitle>
                <CardDescription className="text-gray-300">Convert between different measurement units</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Open Calculator</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-300">Latest updates and changes in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === "recipe"
                          ? "bg-red-600/20"
                          : activity.type === "note"
                            ? "bg-yellow-600/20"
                            : "bg-blue-600/20"
                      }`}
                    >
                      {activity.type === "recipe" && <BookOpen className="h-4 w-4 text-red-600" />}
                      {activity.type === "note" && <MessageSquare className="h-4 w-4 text-yellow-600" />}
                      {activity.type === "employee" && <Users className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {activity.action === "created" && "Created"}
                        {activity.action === "updated" && "Updated"}
                        {activity.action === "added" && "Added"}
                        {activity.action === "received" && "Received"} {activity.item}
                      </p>
                      <p className="text-gray-400 text-sm">by {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
