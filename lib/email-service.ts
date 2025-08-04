import { Resend } from "resend"

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
  replyTo?: string
  cc?: string[]
  bcc?: string[]
}

interface EmailResponse {
  success: boolean
  id?: string
  error?: string
}

// Default sender configuration
const DEFAULT_FROM = "RecipeVault <noreply@recipevault.com>"
const SALES_EMAIL = "sales@recipevault.com"
const SUPPORT_EMAIL = "support@recipevault.com"

/**
 * Send email using Resend service
 */
export const sendEmail = async (options: EmailOptions): Promise<EmailResponse> => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return {
        success: false,
        error: "Email service not configured",
      }
    }

    const { data, error } = await resend.emails.send({
      from: options.from || DEFAULT_FROM,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
      cc: options.cc,
      bcc: options.bcc,
    })

    if (error) {
      console.error("Resend API error:", error)
      return {
        success: false,
        error: error.message || "Failed to send email",
      }
    }

    console.log("Email sent successfully:", data?.id)
    return {
      success: true,
      id: data?.id,
    }
  } catch (error) {
    console.error("Email service error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/**
 * Send bulk emails (useful for notifications to multiple recipients)
 */
export const sendBulkEmails = async (emails: EmailOptions[]): Promise<EmailResponse[]> => {
  const results = await Promise.allSettled(emails.map((email) => sendEmail(email)))

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value
    } else {
      console.error(`Failed to send email ${index}:`, result.reason)
      return {
        success: false,
        error: result.reason?.message || "Failed to send email",
      }
    }
  })
}

/**
 * Validate email address format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get email service status and configuration
 */
export const getEmailServiceStatus = async () => {
  try {
    if (!process.env.RESEND_API_KEY) {
      return {
        configured: false,
        error: "RESEND_API_KEY not found in environment variables",
      }
    }

    // Test the API key by attempting to get domains (this doesn't send an email)
    const { data, error } = await resend.domains.list()

    if (error) {
      return {
        configured: false,
        error: `Resend API error: ${error.message}`,
      }
    }

    return {
      configured: true,
      domains: data?.data || [],
      message: "Email service is properly configured",
    }
  } catch (error) {
    return {
      configured: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Email template wrapper for consistent styling
export const wrapEmailTemplate = (content: string, preheader?: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>RecipeVault</title>
    ${preheader ? `<meta name="description" content="${preheader}">` : ""}
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        /* Reset styles for better email client compatibility */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .dark-mode-bg { background-color: #1e293b !important; }
            .dark-mode-text { color: #e2e8f0 !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a;">
    ${
      preheader
        ? `
    <!-- Preheader text -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        ${preheader}
    </div>
    `
        : ""
    }
    
    <!-- Email content -->
    ${content}
    
    <!-- Tracking pixel (if needed) -->
    <img src="https://recipevault.com/email-tracking.png" width="1" height="1" style="display: none;" alt="">
</body>
</html>
  `
}

// Export email addresses for easy reference
export const EMAIL_ADDRESSES = {
  SALES: SALES_EMAIL,
  SUPPORT: SUPPORT_EMAIL,
  NOREPLY: DEFAULT_FROM,
} as const
