"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="bg-slate-800 border-slate-700 max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600/20 p-4 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="flex items-center justify-center mb-2">
            <ChefHat className="h-6 w-6 text-yellow-600 mr-2" />
            <span className="text-xl font-bold text-white">RecipeVault</span>
          </div>
          <CardTitle className="text-white">Something went wrong!</CardTitle>
          <CardDescription className="text-gray-300">
            We encountered an unexpected error. Don't worry, our team has been notified.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="bg-slate-700 p-3 rounded-lg">
              <p className="text-red-400 text-sm font-mono">{error.message}</p>
              {error.digest && <p className="text-gray-400 text-xs mt-1">Error ID: {error.digest}</p>}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={reset} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Link href="/" className="flex-1">
              <Button
                variant="outline"
                className="w-full text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Need help?{" "}
              <Link href="/contact" className="text-yellow-600 hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
