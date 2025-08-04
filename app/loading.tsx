import { ChefHat } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <ChefHat className="h-16 w-16 text-yellow-600 mx-auto mb-4 animate-pulse" />
          <div className="absolute inset-0 h-16 w-16 mx-auto">
            <div className="h-full w-full border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">RecipeVault</h2>
        <p className="text-gray-300">Loading your culinary workspace...</p>
      </div>
    </div>
  )
}
