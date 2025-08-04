"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Search, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="bg-slate-800 border-slate-700 max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-600/20 p-4 rounded-full">
              <Search className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center justify-center mb-2">
            <ChefHat className="h-6 w-6 text-yellow-600 mr-2" />
            <span className="text-xl font-bold text-white">RecipeVault</span>
          </div>
          <CardTitle className="text-white">Page Not Found</CardTitle>
          <CardDescription className="text-gray-300">
            The recipe you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-6xl font-bold text-red-600 mb-2">404</div>
            <p className="text-gray-400 text-sm mb-6">This page seems to have gone missing from our kitchen!</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex-1 text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Looking for something specific?{" "}
              <Link href="/contact" className="text-yellow-600 hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
