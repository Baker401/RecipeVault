"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ChefHat, ArrowLeft, Mail, CheckCircle, AlertCircle, Send, Settings } from "lucide-react"
import Link from "next/link"

interface EmailStatus {
  configured: boolean
  domains?: any[]
  error?: string
  message?: string
}

interface TestEmailResult {
  success: boolean
  id?: string
  error?: string
}

export default function EmailTestPage() {
  const [emailStatus, setEmailStatus] = useState<EmailStatus | null>(null)
  const [testResult, setTestResult] = useState<TestEmailResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [testEmail, setTestEmail] = useState("")
  const [testSubject, setTestSubject] = useState("RecipeVault Email Service Test")
  const [testMessage, setTestMessage] = useState("This is a test email to verify the email service integration.")

  const checkEmailStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/email/test")
      const data = await response.json()
      setEmailStatus(data)
    } catch (error) {
      setEmailStatus({
        configured: false,
        error: "Failed to check email service status",
      })
    } finally {
      setLoading(false)
    }
  }

  const sendTestEmail = async () => {
    if (!testEmail) return

    setLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/email/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: testEmail,
          subject: testSubject,
          message: testMessage,
        }),
      })

      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Failed to send test email",
      })
    } finally {
      setLoading(false)
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
                <h1 className="text-2xl font-bold text-white">Email Service Test</h1>
              </Link>
            </div>
            <Link href="/admin/dashboard">
              <Button variant="outline" className="text-gray-300 border-slate-600 hover:bg-slate-700 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Email Service Status */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="h-5 w-5 text-yellow-600 mr-2" />
                Email Service Status
              </CardTitle>
              <CardDescription className="text-gray-300">
                Check if the Resend email service is properly configured
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={checkEmailStatus}
                disabled={loading}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Checking...
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4 mr-2" />
                    Check Status
                  </>
                )}
              </Button>

              {emailStatus && (
                <div className="space-y-4">
                  {emailStatus.configured ? (
                    <Alert className="border-green-600/50 bg-green-600/10">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-400">
                        <div className="flex items-center justify-between">
                          <span>Email service is properly configured!</span>
                          <Badge className="bg-green-600 text-white">Active</Badge>
                        </div>
                        {emailStatus.message && <div className="mt-2 text-sm">{emailStatus.message}</div>}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="border-red-600/50 bg-red-600/10">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-400">
                        <div className="flex items-center justify-between">
                          <span>Email service configuration issue</span>
                          <Badge className="bg-red-600 text-white">Error</Badge>
                        </div>
                        {emailStatus.error && <div className="mt-2 text-sm">{emailStatus.error}</div>}
                      </AlertDescription>
                    </Alert>
                  )}

                  {emailStatus.domains && emailStatus.domains.length > 0 && (
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Configured Domains:</h4>
                      <div className="space-y-2">
                        {emailStatus.domains.map((domain: any, index: number) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">{domain.name}</span>
                            <Badge
                              className={
                                domain.status === "verified" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                              }
                            >
                              {domain.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Email Form */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Mail className="h-5 w-5 text-red-600 mr-2" />
                Send Test Email
              </CardTitle>
              <CardDescription className="text-gray-300">
                Send a test email to verify the email service is working correctly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="testEmail" className="text-gray-300">
                    Recipient Email *
                  </Label>
                  <Input
                    id="testEmail"
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                    placeholder="test@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="testSubject" className="text-gray-300">
                    Subject
                  </Label>
                  <Input
                    id="testSubject"
                    value={testSubject}
                    onChange={(e) => setTestSubject(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="testMessage" className="text-gray-300">
                  Test Message
                </Label>
                <Textarea
                  id="testMessage"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 min-h-[100px]"
                />
              </div>

              <Button
                onClick={sendTestEmail}
                disabled={loading || !testEmail}
                className="w-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Test Email
                  </>
                )}
              </Button>

              {testResult && (
                <div className="mt-4">
                  {testResult.success ? (
                    <Alert className="border-green-600/50 bg-green-600/10">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-400">
                        <div className="flex items-center justify-between">
                          <span>Test email sent successfully!</span>
                          <Badge className="bg-green-600 text-white">Sent</Badge>
                        </div>
                        {testResult.id && <div className="mt-2 text-sm">Email ID: {testResult.id}</div>}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="border-red-600/50 bg-red-600/10">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-400">
                        <div className="flex items-center justify-between">
                          <span>Failed to send test email</span>
                          <Badge className="bg-red-600 text-white">Failed</Badge>
                        </div>
                        {testResult.error && <div className="mt-2 text-sm">{testResult.error}</div>}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Setup Instructions */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Setup Instructions</CardTitle>
              <CardDescription className="text-gray-300">How to configure the Resend email service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-3">1. Install Resend Package</h4>
                <code className="text-green-400 bg-slate-900 p-2 rounded text-sm block">npm install resend</code>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-3">2. Get Resend API Key</h4>
                <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                  <li>
                    Sign up at{" "}
                    <a
                      href="https://resend.com"
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      resend.com
                    </a>
                  </li>
                  <li>Go to API Keys section</li>
                  <li>Create a new API key</li>
                  <li>Copy the API key</li>
                </ol>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-3">3. Configure Environment Variables</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>
                    Add to your <code className="text-green-400 bg-slate-900 px-1 rounded">.env.local</code> file:
                  </p>
                  <code className="text-green-400 bg-slate-900 p-2 rounded text-sm block">
                    RESEND_API_KEY=re_your_api_key_here
                  </code>
                </div>
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-3">4. Verify Domain (Optional)</h4>
                <div className="text-gray-300 text-sm space-y-1">
                  <p>For production use:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Add your domain in Resend dashboard</li>
                    <li>Configure DNS records</li>
                    <li>Verify domain ownership</li>
                  </ul>
                </div>
              </div>

              <Alert className="border-blue-600/50 bg-blue-600/10">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-400">
                  <strong>Note:</strong> Without a verified domain, emails will be sent from a Resend subdomain. For
                  production use, it's recommended to verify your own domain for better deliverability.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
