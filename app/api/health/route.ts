import { NextResponse } from "next/server"
import { getEmailServiceStatus } from "@/lib/email-service"

export async function GET() {
  try {
    // Check email service
    const emailStatus = await getEmailServiceStatus()

    // Check environment variables
    const requiredEnvVars = ["RESEND_API_KEY"]

    const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

    // Overall health status
    const isHealthy = emailStatus.configured && missingEnvVars.length === 0

    const healthData = {
      status: isHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      services: {
        email: {
          status: emailStatus.configured ? "up" : "down",
          provider: "resend",
          details: emailStatus.configured ? "Service configured and ready" : emailStatus.error,
        },
      },
      configuration: {
        missingEnvVars,
        hasRequiredConfig: missingEnvVars.length === 0,
      },
    }

    return NextResponse.json(healthData, {
      status: isHealthy ? 200 : 503,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
