"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChefHat, Calculator, ArrowRightLeft } from "lucide-react"
import Link from "next/link"

export default function ConverterPage() {
  const [fromValue, setFromValue] = useState("")
  const [fromUnit, setFromUnit] = useState("")
  const [toUnit, setToUnit] = useState("")
  const [result, setResult] = useState("")

  const conversions = {
    volume: {
      name: "Volume",
      units: {
        cup: { name: "Cups", toMl: 236.588 },
        tbsp: { name: "Tablespoons", toMl: 14.787 },
        tsp: { name: "Teaspoons", toMl: 4.929 },
        "fl-oz": { name: "Fluid Ounces", toMl: 29.574 },
        pt: { name: "Pints", toMl: 473.176 },
        qt: { name: "Quarts", toMl: 946.353 },
        gal: { name: "Gallons", toMl: 3785.41 },
        ml: { name: "Milliliters", toMl: 1 },
        l: { name: "Liters", toMl: 1000 },
      },
    },
    weight: {
      name: "Weight",
      units: {
        oz: { name: "Ounces", toGrams: 28.3495 },
        lb: { name: "Pounds", toGrams: 453.592 },
        g: { name: "Grams", toGrams: 1 },
        kg: { name: "Kilograms", toGrams: 1000 },
      },
    },
    temperature: {
      name: "Temperature",
      units: {
        f: { name: "Fahrenheit" },
        c: { name: "Celsius" },
      },
    },
  }

  const [selectedCategory, setSelectedCategory] = useState("volume")

  const convert = () => {
    if (!fromValue || !fromUnit || !toUnit) return

    const value = Number.parseFloat(fromValue)
    if (isNaN(value)) return

    let convertedValue = 0

    if (selectedCategory === "volume") {
      const fromMl = value * conversions.volume.units[fromUnit as keyof typeof conversions.volume.units].toMl
      convertedValue = fromMl / conversions.volume.units[toUnit as keyof typeof conversions.volume.units].toMl
    } else if (selectedCategory === "weight") {
      const fromGrams = value * conversions.weight.units[fromUnit as keyof typeof conversions.weight.units].toGrams
      convertedValue = fromGrams / conversions.weight.units[toUnit as keyof typeof conversions.weight.units].toGrams
    } else if (selectedCategory === "temperature") {
      if (fromUnit === "f" && toUnit === "c") {
        convertedValue = ((value - 32) * 5) / 9
      } else if (fromUnit === "c" && toUnit === "f") {
        convertedValue = (value * 9) / 5 + 32
      } else {
        convertedValue = value
      }
    }

    setResult(convertedValue.toFixed(4))
  }

  const swapUnits = () => {
    const tempUnit = fromUnit
    setFromUnit(toUnit)
    setToUnit(tempUnit)
    if (result) {
      setFromValue(result)
      setResult("")
    }
  }

  const commonConversions = [
    { from: "1 cup", to: "16 tbsp", category: "volume" },
    { from: "1 cup", to: "8 fl oz", category: "volume" },
    { from: "1 tbsp", to: "3 tsp", category: "volume" },
    { from: "1 lb", to: "16 oz", category: "weight" },
    { from: "350°F", to: "175°C", category: "temperature" },
    { from: "1 qt", to: "4 cups", category: "volume" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="flex items-center">
              <ChefHat className="h-8 w-8 text-yellow-600 mr-3" />
              <h1 className="text-2xl font-bold text-white">Measurement Converter</h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Converter */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calculator className="h-5 w-5 text-red-600 mr-2" />
                  Unit Converter
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Convert between different measurement units for cooking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {Object.entries(conversions).map(([key, category]) => (
                        <SelectItem key={key} value={key} className="text-white hover:bg-slate-600">
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Conversion Input */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-2 block">From</label>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        placeholder="Enter value"
                        value={fromValue}
                        onChange={(e) => setFromValue(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      />
                      <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {Object.entries(conversions[selectedCategory as keyof typeof conversions].units).map(
                            ([key, unit]) => (
                              <SelectItem key={key} value={key} className="text-white hover:bg-slate-600">
                                {unit.name}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={swapUnits}
                      className="border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-2 block">To</label>
                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder="Result"
                        value={result}
                        readOnly
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      />
                      <Select value={toUnit} onValueChange={setToUnit}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {Object.entries(conversions[selectedCategory as keyof typeof conversions].units).map(
                            ([key, unit]) => (
                              <SelectItem key={key} value={key} className="text-white hover:bg-slate-600">
                                {unit.name}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button onClick={convert} className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Convert
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Reference */}
          <div>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Common Conversions</CardTitle>
                <CardDescription className="text-gray-300">
                  Quick reference for frequently used conversions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {commonConversions.map((conversion, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0"
                    >
                      <span className="text-white font-medium">{conversion.from}</span>
                      <span className="text-gray-400">=</span>
                      <span className="text-yellow-400">{conversion.to}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Measurement Tips */}
            <Card className="bg-slate-800 border-slate-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white">Measurement Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-300">
                  <div>
                    <h4 className="font-medium text-white mb-1">Dry Ingredients</h4>
                    <p>Use dry measuring cups and level off with a knife for accuracy.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Liquid Ingredients</h4>
                    <p>Use liquid measuring cups and read at eye level.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Brown Sugar</h4>
                    <p>Pack firmly into measuring cup unless recipe specifies otherwise.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
