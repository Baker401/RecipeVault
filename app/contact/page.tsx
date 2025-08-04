"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ChefHat,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  DollarSign,
  Users,
  BookOpen,
  Calculator,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { sendSalesInquiry, sendSupportRequest } from "@/lib/email-templates"

interface SalesFormData {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  employees: string
  currentSolution: string
  timeline: string
  message: string
}

interface SupportFormData {
  name: string
  email: string
  organization: string
  priority: string
  category: string
  subject: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

export default function ContactPage() {
  const [salesForm, setSalesForm] = useState<SalesFormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    employees: "",
    currentSolution: "",
    timeline: "",
    message: "",
  })

  const [supportForm, setSupportForm] = useState<SupportFormData>({
    name: "",
    email: "",
    organization: "",
    priority: "",
    category: "",
    subject: "",
    message: "",
  })

  const [salesErrors, setSalesErrors] = useState<FormErrors>({})
  const [supportErrors, setSupportErrors] = useState<FormErrors>({})
  const [salesSubmitted, setSalesSubmitted] = useState(false)
  const [supportSubmitted, setSupportSubmitted] = useState(false)
  const [salesSubmitting, setSalesSubmitting] = useState(false)
  const [supportSubmitting, setSupportSubmitting] = useState(false)

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true // Phone is optional
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))
  }

  const validateSalesForm = (): boolean => {
    const errors: FormErrors = {}

    // Required field validations
    if (!salesForm.firstName.trim()) {
      errors.firstName = "First name is required"
    } else if (salesForm.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters"
    }

    if (!salesForm.lastName.trim()) {
      errors.lastName = "Last name is required"
    } else if (salesForm.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters"
    }

    if (!salesForm.email.trim()) {
      errors.email = "Email is required"
    } else if (!validateEmail(salesForm.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!salesForm.company.trim()) {
      errors.company = "Company/Organization is required"
    } else if (salesForm.company.trim().length < 2) {
      errors.company = "Company name must be at least 2 characters"
    }

    if (salesForm.phone && !validatePhone(salesForm.phone)) {
      errors.phone = "Please enter a valid phone number"
    }

    setSalesErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateSupportForm = (): boolean => {
    const errors: FormErrors = {}

    if (!supportForm.name.trim()) {
      errors.name = "Full name is required"
    } else if (supportForm.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    if (!supportForm.email.trim()) {
      errors.email = "Email is required"
    } else if (!validateEmail(supportForm.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!supportForm.priority) {
      errors.priority = "Please select a priority level"
    }

    if (!supportForm.subject.trim()) {
      errors.subject = "Subject is required"
    } else if (supportForm.subject.trim().length < 5) {
      errors.subject = "Subject must be at least 5 characters"
    }

    if (!supportForm.message.trim()) {
      errors.message = "Detailed description is required"
    } else if (supportForm.message.trim().length < 20) {
      errors.message = "Please provide more details (at least 20 characters)"
    }

    setSupportErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSalesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateSalesForm()) {
      return
    }

    setSalesSubmitting(true)

    try {
      // Send emails using the email templates
      const result = await sendSalesInquiry(salesForm)

      if (result.success) {
        setSalesSubmitted(true)
      } else {
        console.error("Failed to send sales inquiry")
        // Handle error (show error message to user)
      }
    } catch (error) {
      console.error("Error subm itting sales form:", error)
      // Handle error (show error message to user)
    } finally {
      setSalesSubmitting(false)
    }
  }

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateSupportForm()) {
      return
    }

    setSupportSubmitting(true)

    try {
      // Send emails using the email templates
      const result = await sendSupportRequest(supportForm)

      if (result.success) {
        setSupportSubmitted(true)
      } else {
        console.error("Failed to send support request")
        // Handle error (show error message to user)
      }
    } catch (error) {
      console.error("Error submitting support form:", error)
      // Handle error (show error message to user)
    } finally {
      setSupportSubmitting(false)
    }
  }

  const resetSalesForm = () => {
    setSalesForm({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: "",
      employees: "",
      currentSolution: "",
      timeline: "",
      message: "",
    })
    setSalesErrors({})
    setSalesSubmitted(false)
  }

  const resetSupportForm = () => {
    setSupportForm({
      name: "",
      email: "",
      organization: "",
      priority: "",
      category: "",
      subject: "",
      message: "",
    })
    setSupportErrors({})
    setSupportSubmitted(false)
  }

  // Real-time validation handlers
  const handleSalesFieldChange = (field: keyof SalesFormData, value: string) => {
    setSalesForm((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (salesErrors[field]) {
      setSalesErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSupportFieldChange = (field: keyof SupportFormData, value: string) => {
    setSupportForm((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (supportErrors[field]) {
      setSupportErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["sales@recipevault.com", "support@recipevault.com"],
      description: "Get in touch via email",
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567"],
      description: "Call us during business hours",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Culinary Street", "San Francisco, CA 94102"],
      description: "Visit our headquarters",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9AM-6PM PST", "Sat-Sun: Closed"],
      description: "When we're available",
    },
  ]

  const features = [
    {
      icon: Users,
      title: "Team Management",
      description: "Manage employees and access controls",
    },
    {
      icon: BookOpen,
      title: "Recipe Organization",
      description: "Organize and categorize recipes",
    },
    {
      icon: Calculator,
      title: "Measurement Tools",
      description: "Built-in conversion calculator",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security and compliance",
    },
  ]

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
              <Link href="/pricing">
                <Button variant="outline" className="text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent">
                  Pricing
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
          <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Have questions about RecipeVault? Need help with your account? Our team is here to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Forms */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="sales" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800 mb-8">
                <TabsTrigger value="sales" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Sales Inquiry
                </TabsTrigger>
                <TabsTrigger
                  value="support"
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Support Request
                </TabsTrigger>
              </TabsList>

              {/* Sales Form */}
              <TabsContent value="sales">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <DollarSign className="h-5 w-5 text-red-600 mr-2" />
                      Sales Inquiry
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Interested in RecipeVault for your organization? Let's discuss how we can help.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {salesSubmitted ? (
                      <div className="text-center py-8">
                        <div className="bg-green-600/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <CheckCircle className="h-8 w-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
                        <p className="text-gray-300 mb-4">
                          We've received your inquiry and sent you a confirmation email. Our sales team will contact you
                          within 24 hours.
                        </p>
                        <Button onClick={resetSalesForm} className="bg-red-600 hover:bg-red-700 text-white">
                          Send Another Inquiry
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSalesSubmit} className="space-y-6">
                        {/* Show general error if form has errors */}
                        {Object.keys(salesErrors).length > 0 && (
                          <Alert className="border-red-600/50 bg-red-600/10">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-400">
                              Please fix the errors below before submitting.
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="text-gray-300">
                              First Name *
                            </Label>
                            <Input
                              id="firstName"
                              value={salesForm.firstName}
                              onChange={(e) => handleSalesFieldChange("firstName", e.target.value)}
                              className={`bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 ${
                                salesErrors.firstName ? "border-red-500 focus:border-red-500" : ""
                              }`}
                              placeholder="John"
                            />
                            {salesErrors.firstName && (
                              <p className="text-red-400 text-sm mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {salesErrors.firstName}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="lastName" className="text-gray-300">
                              Last Name *
                            </Label>
                            <Input
                              id="lastName"
                              value={salesForm.lastName}
                              onChange={(e) => handleSalesFieldChange("lastName", e.target.value)}
                              className={`bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 ${
                                salesErrors.lastName ? "border-red-500 focus:border-red-500" : ""
                              }`}
                              placeholder="Smith"
                            />
                            {salesErrors.lastName && (
                              <p className="text-red-400 text-sm mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {salesErrors.lastName}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email" className="text-gray-300">
                              Email *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={salesForm.email}
                              onChange={(e) => handleSalesFieldChange("email", e.target.value)}
                              className={`bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 ${
                                salesErrors.email ? "border-red-500 focus:border-red-500" : ""
                              }`}
                              placeholder="john@company.com"
                            />
                            {salesErrors.email && (
                              <p className="text-red-400 text-sm mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {salesErrors.email}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-gray-300">
                              Phone
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={salesForm.phone}
                              onChange={(e) => handleSalesFieldChange("phone", e.target.value)}
                              className={`bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 ${
                                salesErrors.phone ? "border-red-500 focus:border-red-500" : ""
                              }`}
                              placeholder="+1 (555) 123-4567"
                            />
                            {salesErrors.phone && (
                              <p className="text-red-400 text-sm mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {salesErrors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="company" className="text-gray-300">
                            Company/Organization *
                          </Label>
                          <Input
                            id="company"
                            value={salesForm.company}
                            onChange={(e) => handleSalesFieldChange("company", e.target.value)}
                            className={`bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 ${
                              salesErrors.company ? "border-red-500 focus:border-red-500" : ""
                            }`}
                            placeholder="Your restaurant or organization name"
                          />
                          {salesErrors.company && (
                            <p className="text-red-400 text-sm mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {salesErrors.company}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="employees" className="text-gray-300">
                              Number of Employees
                            </Label>
                            <Select
                              value={salesForm.employees}
                              onValueChange={(value) => handleSalesFieldChange("employees", value)}
                            >
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder="Select range" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-700 border-slate-600">
                                <SelectItem value="1-5" className="text-white hover:bg-slate-600">
                                  1-5 employees
                                </SelectItem>
                                <SelectItem value="6-25" className="text-white hover:bg-slate-600">
                                  6-25 employees
                                </SelectItem>
                                <SelectItem value="26-100" className="text-white hover:bg-slate-600">
                                  26-100 employees
                                </SelectItem>
                                <SelectItem value="100+" className="text-white hover:bg-slate-600">
                                  100+ employees
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="timeline" className="text-gray-300">
                              Implementation Timeline
                            </Label>
                            <Select
                              value={salesForm.timeline}
                              onValueChange={(value) => handleSalesFieldChange("timeline", value)}
                            >
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-700 border-slate-600">
                                <SelectItem value="immediate" className="text-white hover:bg-slate-600">
                                  Immediate (within 1 month)
                                </SelectItem>
                                <SelectItem value="quarter" className="text-white hover:bg-slate-600">
                                  This quarter (1-3 months)
                                </SelectItem>
                                <SelectItem value="half-year" className="text-white hover:bg-slate-600">
                                  Next 6 months
                                </SelectItem>
                                <SelectItem value="exploring" className="text-white hover:bg-slate-600">
                                  Just exploring
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="currentSolution" className="text-gray-300">
                            Current Solution
                          </Label>
                          <Input
                            id="currentSolution"
                            value={salesForm.currentSolution}
                            onChange={(e) => handleSalesFieldChange("currentSolution", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                            placeholder="What are you currently using for recipe management?"
                          />
                        </div>

                        <div>
                          <Label htmlFor="message" className="text-gray-300">
                            Message
                          </Label>
                          <Textarea
                            id="message"
                            value={salesForm.message}
                            onChange={(e) => handleSalesFieldChange("message", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 min-h-[120px]"
                            placeholder="Tell us about your specific needs and requirements..."
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={salesSubmitting}
                          className="w-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                        >
                          {salesSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Sales Inquiry
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Support Form */}
              <TabsContent value="support">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <MessageSquare className="h-5 w-5 text-yellow-600 mr-2" />
                      Support Request
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Need help with your RecipeVault account? Our support team is here to assist you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {supportSubmitted ? (
                      <div className="text-center py-8">
                        <div className="bg-green-600/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <CheckCircle className="h-8 w-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Support Request Submitted!</h3>
                        <p className="text-gray-300 mb-4">
                          We've received your support request and sent you a confirmation email with your ticket number.
                          Our team will respond based on the priority level you selected.
                        </p>
                        <div className="bg-slate-700 p-4 rounded-lg mb-4">
                          <p className="text-sm text-gray-300">
                            <strong className="text-white">Response Times:</strong>
                            <br />
                            High Priority: Within 2 hours
                            <br />
                            Medium Priority: Within 24 hours
                            <br />
                            Low Priority: Within 48 hours
                          </p>
                        </div>
                        <Button onClick={resetSupportForm} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                          Submit Another Request
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSupportSubmit} className="space-y-6">
                        {/* Show general error if form has errors */}
                        {Object.keys(supportErrors).length > 0 && (
                          <Alert className="border-red-600/50 bg-red-600/10">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-400">
                              Please fix the errors below before submitting.
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="supportName" className="text-gray-300">
                              Full Name *
                            </Label>
                            <Input
                              id="supportName"
                              value={supportForm.name}
                              onChange={(e) => handleSupportFieldChange("name", e.target.value)}
                              className={`bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 ${
                                supportErrors.name ? "border-red-500 focus:border-red-500" : ""
                              }`}
                              placeholder="Your full name"
                            />
                            {supportErrors.name && (
                              <p className="text-red-400 text-sm mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {supportErrors.name}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="supportEmail" className="text-gray-300">
                              Email *
                            </Label>
                            <Input
                              id="supportEmail"
                              type="email"
                              value={supportForm.email}
                              onChange={(e) => handleSupportFieldChange("email", e.target.value)}
                              className={`bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 ${
                                supportErrors.email ? "border-red-500 focus:border-red-500" : ""
                              }`}
                              placeholder="your@email.com"
                            />
                            {supportErrors.email && (
                              <p className="text-red-400 text-sm mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {supportErrors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="organization" className="text-gray-300">
                            Organization
                          </Label>
                          <Input
                            id="organization"
                            value={supportForm.organization}
                            onChange={(e) => handleSupportFieldChange("organization", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                            placeholder="Your organization name"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="priority" className="text-gray-300">
                              Priority *
                            </Label>
                            <Select
                              value={supportForm.priority}
                              onValueChange={(value) => handleSupportFieldChange("priority", value)}
                            >
                              <SelectTrigger
                                className={`bg-slate-700 border-slate-600 text-white ${
                                  supportErrors.priority ? "border-red-500" : ""
                                }`}
                              >
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-700 border-slate-600">
                                <SelectItem value="high" className="text-white hover:bg-slate-600">
                                  <div className="flex items-center">
                                    <Badge className="bg-red-600 text-white mr-2 text-xs">High</Badge>
                                    System down/critical issue
                                  </div>
                                </SelectItem>
                                <SelectItem value="medium" className="text-white hover:bg-slate-600">
                                  <div className="flex items-center">
                                    <Badge className="bg-yellow-600 text-white mr-2 text-xs">Medium</Badge>
                                    Feature not working
                                  </div>
                                </SelectItem>
                                <SelectItem value="low" className="text-white hover:bg-slate-600">
                                  <div className="flex items-center">
                                    <Badge className="bg-green-600 text-white mr-2 text-xs">Low</Badge>
                                    General question
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            {supportErrors.priority && (
                              <p className="text-red-400 text-sm mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {supportErrors.priority}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="category" className="text-gray-300">
                              Category
                            </Label>
                            <Select
                              value={supportForm.category}
                              onValueChange={(value) => handleSupportFieldChange("category", value)}
                            >
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-700 border-slate-600">
                                <SelectItem value="account" className="text-white hover:bg-slate-600">
                                  Account & Billing
                                </SelectItem>
                                <SelectItem value="recipes" className="text-white hover:bg-slate-600">
                                  Recipe Management
                                </SelectItem>
                                <SelectItem value="employees" className="text-white hover:bg-slate-600">
                                  Employee Management
                                </SelectItem>
                                <SelectItem value="converter" className="text-white hover:bg-slate-600">
                                  Measurement Converter
                                </SelectItem>
                                <SelectItem value="mobile" className="text-white hover:bg-slate-600">
                                  Mobile App
                                </SelectItem>
                                <SelectItem value="other" className="text-white hover:bg-slate-600">
                                  Other
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="subject" className="text-gray-300">
                            Subject *
                          </Label>
                          <Input
                            id="subject"
                            value={supportForm.subject}
                            onChange={(e) => handleSupportFieldChange("subject", e.target.value)}
                            className={`bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 ${
                              supportErrors.subject ? "border-red-500 focus:border-red-500" : ""
                            }`}
                            placeholder="Brief description of your issue"
                          />
                          {supportErrors.subject && (
                            <p className="text-red-400 text-sm mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {supportErrors.subject}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="supportMessage" className="text-gray-300">
                            Detailed Description *
                          </Label>
                          <Textarea
                            id="supportMessage"
                            value={supportForm.message}
                            onChange={(e) => handleSupportFieldChange("message", e.target.value)}
                            className={`bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 min-h-[120px] ${
                              supportErrors.message ? "border-red-500 focus:border-red-500" : ""
                            }`}
                            placeholder="Please provide as much detail as possible about your issue, including steps to reproduce if applicable..."
                          />
                          {supportErrors.message && (
                            <p className="text-red-400 text-sm mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {supportErrors.message}
                            </p>
                          )}
                          <p className="text-gray-400 text-xs mt-1">
                            {supportForm.message.length}/20 characters minimum
                          </p>
                        </div>

                        <Button
                          type="submit"
                          disabled={supportSubmitting}
                          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white disabled:opacity-50"
                        >
                          {supportSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Submit Support Request
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Contact Information & Features */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
                <CardDescription className="text-gray-300">Multiple ways to reach our team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-red-600/20 p-2 rounded-lg">
                      <info.icon className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-300 text-sm">
                          {detail}
                        </p>
                      ))}
                      <p className="text-gray-400 text-xs mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Features */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Why Choose RecipeVault?</CardTitle>
                <CardDescription className="text-gray-300">Key features that set us apart</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-yellow-600/20 p-2 rounded-lg">
                      <feature.icon className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm">{feature.title}</h4>
                      <p className="text-gray-400 text-xs">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-r from-red-600/20 to-yellow-600/20 border-red-600/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Get Started?</h3>
                <p className="text-gray-300 text-sm mb-4">Try RecipeVault free for 14 days</p>
                <Link href="/auth">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
