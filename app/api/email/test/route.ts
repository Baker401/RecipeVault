import { type NextRequest, NextResponse } from "next/server"
import { getEmailServiceStatus, sendEmail } from "@/lib/email-service"

export async function GET() {
  try {
    const status = await getEmailServiceStatus()
    return NextResponse.json(status)
  } catch (error) {
    return NextResponse.json(
      {
        configured: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message } = await request.json()

    if (!to || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, subject, message" },
        { status: 400 },
      )
    }

    const testEmailHtml = `
      <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 8px; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="background: linear-gradient(135deg, #8B0000 0%, #B8860B 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0;">🍳 RecipeVault</h1>
          <p style="color: #f1f5f9; margin: 8px 0 0 0; font-size: 16px;">Email Service Test</p>
        </div>
        
        <div style="padding: 30px 20px;">
          <div style="background-color: #065f46; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <div style="color: #10b981; font-weight: 600; margin-bottom: 10px;">✅ Email Service Working!</div>
            <div style="color: #d1d5db;">
              This is a test email to verify that the Resend integration is working correctly.
            </div>
          </div>
          
          <div style="background-color: #374151; padding: 20px; border-radius: 8px; border-left: 4px solid #B8860B;">
            <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Test Message</div>
            <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${message}</div>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px;">
              Sent at: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
        
        <div style="background-color: #111827; padding: 20px; text-align: center; border-top: 1px solid #374151;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            RecipeVault Email Service Test
          </p>
        </div>
      </div>
    `

    const result = await sendEmail({
      to,
      subject: `[TEST] ${subject}`,
      html: testEmailHtml,
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
