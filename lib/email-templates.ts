import { sendEmail, wrapEmailTemplate, EMAIL_ADDRESSES } from "./email-service"

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

// Sales inquiry notification email (to sales team)
export const generateSalesNotificationEmail = (data: SalesFormData): string => {
  const content = `
    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #8B0000 0%, #B8860B 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">🍳 RecipeVault</h1>
            <p style="color: #f1f5f9; margin: 8px 0 0 0; font-size: 16px;">Sales Inquiry Notification</p>
        </div>
        
        <div style="padding: 30px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="background-color: #dc2626; color: white; padding: 15px; border-radius: 6px; margin-bottom: 25px; font-weight: 600; text-align: center;">
                🚨 New Sales Inquiry Received - Requires Immediate Attention
            </div>
            
            <div style="margin-bottom: 25px;">
                <h2 style="color: #B8860B; font-size: 18px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #374151; padding-bottom: 8px;">Contact Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 50%; padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #8B0000; margin-bottom: 15px; vertical-align: top;">
                            <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Full Name</div>
                            <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.firstName} ${data.lastName}</div>
                        </td>
                        <td style="width: 15px;"></td>
                        <td style="width: 50%; padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #8B0000; margin-bottom: 15px; vertical-align: top;">
                            <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Email</div>
                            <div style="color: #f9fafb; font-size: 14px; font-weight: 500;"><a href="mailto:${data.email}" style="color: #60a5fa; text-decoration: none;">${data.email}</a></div>
                        </td>
                    </tr>
                </table>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <td style="width: 50%; padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #8B0000; vertical-align: top;">
                            <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Company</div>
                            <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.company}</div>
                        </td>
                        <td style="width: 15px;"></td>
                        <td style="width: 50%; padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #8B0000; vertical-align: top;">
                            <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Phone</div>
                            <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.phone || "Not provided"}</div>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h2 style="color: #B8860B; font-size: 18px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #374151; padding-bottom: 8px;">Business Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 50%; padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #B8860B; vertical-align: top;">
                            <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Number of Employees</div>
                            <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.employees || "Not specified"}</div>
                        </td>
                        <td style="width: 15px;"></td>
                        <td style="width: 50%; padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #B8860B; vertical-align: top;">
                            <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Implementation Timeline</div>
                            <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.timeline || "Not specified"}</div>
                        </td>
                    </tr>
                </table>
                <div style="padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #B8860B; margin-top: 15px;">
                    <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Current Solution</div>
                    <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.currentSolution || "Not specified"}</div>
                </div>
            </div>
            
            ${
              data.message
                ? `
            <div style="margin-bottom: 25px;">
                <h2 style="color: #B8860B; font-size: 18px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #374151; padding-bottom: 8px;">Additional Message</h2>
                <div style="background-color: #374151; padding: 20px; border-radius: 6px; border-left: 4px solid #B8860B;">
                    <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.message}</div>
                </div>
            </div>
            `
                : ""
            }
            
            <div style="margin-bottom: 25px;">
                <h2 style="color: #B8860B; font-size: 18px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #374151; padding-bottom: 8px;">Next Steps</h2>
                <div style="padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #8B0000;">
                    <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">
                        • Respond within 24 hours<br>
                        • Schedule a demo call<br>
                        • Send pricing information<br>
                        • Add to CRM system
                    </div>
                </div>
            </div>
        </div>
        
        <div style="background-color: #111827; padding: 20px; text-align: center; border-top: 1px solid #374151;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                RecipeVault Sales Team • Received: ${new Date().toLocaleString()}
            </p>
        </div>
    </div>
  `

  return wrapEmailTemplate(content, `New sales inquiry from ${data.company} - ${data.firstName} ${data.lastName}`)
}

// Sales inquiry auto-response email (to customer)
export const generateSalesAutoResponseEmail = (data: SalesFormData): string => {
  const content = `
    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #8B0000 0%, #B8860B 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">🍳 RecipeVault</h1>
            <p style="color: #f1f5f9; margin: 10px 0 0 0; font-size: 18px;">Thank You for Your Interest!</p>
        </div>
        
        <div style="padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="font-size: 20px; color: #f9fafb; margin-bottom: 20px;">
                Hello ${data.firstName},
            </div>
            
            <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 25px;">
                Thank you for your interest in RecipeVault! We're excited to help ${data.company} 
                transform your kitchen operations with our professional recipe management platform.
            </p>
            
            <div style="background-color: #065f46; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <div style="color: #10b981; font-weight: 600; margin-bottom: 10px;">⏰ What Happens Next?</div>
                <div style="color: #d1d5db;">
                    Our sales team will review your inquiry and contact you within <strong>24 hours</strong> 
                    to schedule a personalized demo and discuss your specific needs.
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #B8860B; font-size: 18px; font-weight: 600; margin-bottom: 15px;">Why Choose RecipeVault?</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 50%; padding: 20px; background-color: #374151; border-radius: 8px; text-align: center; border-top: 3px solid #8B0000; vertical-align: top;">
                            <div style="font-size: 24px; margin-bottom: 10px;">👥</div>
                            <div style="color: #f9fafb; font-weight: 600; margin-bottom: 8px;">Team Management</div>
                            <div style="color: #d1d5db; font-size: 14px;">Manage employees with role-based access</div>
                        </td>
                        <td style="width: 15px;"></td>
                        <td style="width: 50%; padding: 20px; background-color: #374151; border-radius: 8px; text-align: center; border-top: 3px solid #8B0000; vertical-align: top;">
                            <div style="font-size: 24px; margin-bottom: 10px;">📚</div>
                            <div style="color: #f9fafb; font-weight: 600; margin-bottom: 8px;">Recipe Organization</div>
                            <div style="color: #d1d5db; font-size: 14px;">Organize and categorize all your recipes</div>
                        </td>
                    </tr>
                </table>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <td style="width: 50%; padding: 20px; background-color: #374151; border-radius: 8px; text-align: center; border-top: 3px solid #8B0000; vertical-align: top;">
                            <div style="font-size: 24px; margin-bottom: 10px;">🧮</div>
                            <div style="color: #f9fafb; font-weight: 600; margin-bottom: 8px;">Measurement Tools</div>
                            <div style="color: #d1d5db; font-size: 14px;">Built-in conversion calculator</div>
                        </td>
                        <td style="width: 15px;"></td>
                        <td style="width: 50%; padding: 20px; background-color: #374151; border-radius: 8px; text-align: center; border-top: 3px solid #8B0000; vertical-align: top;">
                            <div style="font-size: 24px; margin-bottom: 10px;">🔒</div>
                            <div style="color: #f9fafb; font-weight: 600; margin-bottom: 8px;">Enterprise Security</div>
                            <div style="color: #d1d5db; font-size: 14px;">Bank-level security and compliance</div>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style="background: linear-gradient(135deg, #8B0000 0%, #B8860B 100%); padding: 30px; border-radius: 8px; text-align: center; margin: 30px 0;">
                <div style="color: white; font-size: 20px; font-weight: 600; margin-bottom: 15px;">Ready to Get Started?</div>
                <p style="color: #f1f5f9; margin-bottom: 20px;">
                    While you wait for our call, explore what RecipeVault can do for your kitchen.
                </p>
                <table style="margin: 0 auto;">
                    <tr>
                        <td style="padding: 0 10px;">
                            <a href="https://recipevault.com/demo" style="display: inline-block; background-color: white; color: #8B0000; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600;">Watch Demo Video</a>
                        </td>
                        <td style="padding: 0 10px;">
                            <a href="https://recipevault.com/pricing" style="display: inline-block; background-color: white; color: #8B0000; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600;">View Pricing</a>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style="background-color: #374151; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <div style="color: #B8860B; font-size: 18px; font-weight: 600; margin-bottom: 15px;">Need Immediate Assistance?</div>
                <div style="color: #d1d5db;">
                    📧 <strong>Email:</strong> <a href="mailto:sales@recipevault.com" style="color: #60a5fa; text-decoration: none;">sales@recipevault.com</a><br>
                    📞 <strong>Phone:</strong> <a href="tel:+15551234567" style="color: #60a5fa; text-decoration: none;">+1 (555) 123-4567</a><br>
                    🕒 <strong>Hours:</strong> Mon-Fri, 9AM-6PM PST
                </div>
            </div>
        </div>
        
        <div style="background-color: #111827; padding: 30px 20px; text-align: center; border-top: 1px solid #374151;">
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
                <strong>RecipeVault</strong> - Professional Recipe Management
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
                123 Culinary Street, San Francisco, CA 94102
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
                © 2024 RecipeVault. All rights reserved.
            </p>
        </div>
    </div>
  `

  return wrapEmailTemplate(content, `Thank you for your interest in RecipeVault, ${data.firstName}!`)
}

// Support request notification email (to support team)
export const generateSupportNotificationEmail = (data: SupportFormData): string => {
  const priorityColors = {
    high: "#dc2626",
    medium: "#d97706",
    low: "#059669",
  }

  const priorityColor = priorityColors[data.priority as keyof typeof priorityColors] || "#6b7280"

  const content = `
    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #B8860B 0%, #8B0000 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">🍳 RecipeVault</h1>
            <p style="color: #f1f5f9; margin: 8px 0 0 0; font-size: 16px;">Support Request Notification</p>
        </div>
        
        <div style="padding: 30px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="background-color: ${priorityColor}; color: white; padding: 15px; border-radius: 6px; margin-bottom: 25px; font-weight: 600; text-align: center; text-transform: uppercase;">
                🎫 ${data.priority.toUpperCase()} Priority Support Request
            </div>
            
            <div style="margin-bottom: 25px;">
                <h2 style="color: #B8860B; font-size: 18px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #374151; padding-bottom: 8px;">Request Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 50%; padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #B8860B; vertical-align: top;">
                            <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Customer Name</div>
                            <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.name}</div>
                        </td>
                        <td style="width: 15px;"></td>
                        <td style="width: 50%; padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #B8860B; vertical-align: top;">
                            <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Email</div>
                            <div style="color: #f9fafb; font-size: 14px; font-weight: 500;"><a href="mailto:${data.email}" style="color: #60a5fa; text-decoration: none;">${data.email}</a></div>
                        </td>
                    </tr>
                </table>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <td style="width: 50%; padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #B8860B; vertical-align: top;">
                            <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Organization</div>
                            <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.organization || "Not provided"}</div>
                        </td>
                        <td style="width: 15px;"></td>
                        <td style="width: 50%; padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #B8860B; vertical-align: top;">
                            <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Category</div>
                            <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.category || "Not specified"}</div>
                        </td>
                    </tr>
                </table>
                
                <div style="padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #B8860B; margin-top: 15px;">
                    <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Subject</div>
                    <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.subject}</div>
                </div>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h2 style="color: #B8860B; font-size: 18px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #374151; padding-bottom: 8px;">Customer Message</h2>
                <div style="background-color: #374151; padding: 20px; border-radius: 6px; border-left: 4px solid ${priorityColor};">
                    <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">${data.message}</div>
                </div>
            </div>
            
            <div style="background-color: #1f2937; border: 2px solid ${priorityColor}; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <div style="color: ${priorityColor}; font-weight: 600; margin-bottom: 10px;">⏰ SLA Response Time</div>
                <div style="color: #d1d5db;">
                    ${data.priority === "high" ? "Within 2 hours" : data.priority === "medium" ? "Within 24 hours" : "Within 48 hours"}
                </div>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h2 style="color: #B8860B; font-size: 18px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #374151; padding-bottom: 8px;">Action Items</h2>
                <div style="padding: 15px; background-color: #374151; border-radius: 6px; border-left: 4px solid #8B0000;">
                    <div style="color: #f9fafb; font-size: 14px; font-weight: 500;">
                        • Acknowledge receipt within 1 hour<br>
                        • Investigate the issue<br>
                        • Provide initial response within SLA<br>
                        • Update ticket status in system<br>
                        • Follow up until resolved
                    </div>
                </div>
            </div>
        </div>
        
        <div style="background-color: #111827; padding: 20px; text-align: center; border-top: 1px solid #374151;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                RecipeVault Support Team • Received: ${new Date().toLocaleString()}
            </p>
        </div>
    </div>
  `

  return wrapEmailTemplate(content, `${data.priority.toUpperCase()} Priority Support Request: ${data.subject}`)
}

// Support request auto-response email (to customer)
export const generateSupportAutoResponseEmail = (data: SupportFormData): string => {
  const ticketId = `RV-${Date.now().toString().slice(-6)}`

  const content = `
    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #B8860B 0%, #8B0000 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">🍳 RecipeVault</h1>
            <p style="color: #f1f5f9; margin: 10px 0 0 0; font-size: 18px;">Support Request Received</p>
        </div>
        
        <div style="padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="font-size: 20px; color: #f9fafb; margin-bottom: 20px;">
                Hello ${data.name},
            </div>
            
            <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 25px;">
                Thank you for contacting RecipeVault support. We've received your request and our team 
                is already working on it. Here are the details of your support ticket:
            </p>
            
            <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 25px; border-radius: 8px; text-align: center; margin: 25px 0;">
                <div style="color: white; font-size: 18px; font-weight: 600; margin-bottom: 10px;">Your Support Ticket</div>
                <div style="color: white; font-size: 24px; font-weight: bold; font-family: monospace;">#${ticketId}</div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #B8860B; font-size: 18px; font-weight: 600; margin-bottom: 15px;">Request Summary</h2>
                <div style="background-color: #374151; padding: 20px; border-radius: 8px; border-left: 4px solid #B8860B;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #4b5563;">
                        <span style="color: #9ca3af; font-weight: 600;">Subject:</span>
                        <span style="color: #f9fafb;">${data.subject}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #4b5563;">
                        <span style="color: #9ca3af; font-weight: 600;">Priority:</span>
                        <span style="color: ${data.priority === "high" ? "#dc2626" : data.priority === "medium" ? "#d97706" : "#059669"};">${data.priority.toUpperCase()}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #4b5563;">
                        <span style="color: #9ca3af; font-weight: 600;">Category:</span>
                        <span style="color: #f9fafb;">${data.category || "General"}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #9ca3af; font-weight: 600;">Status:</span>
                        <span style="color: #f9fafb;">Open</span>
                    </div>
                </div>
            </div>
            
            <div style="background-color: #1f2937; border: 2px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <div style="color: #10b981; font-weight: 600; margin-bottom: 10px;">⏰ Expected Response Time</div>
                <div style="color: #d1d5db;">
                    Based on your ${data.priority} priority request, our support team will respond within:
                    <strong>
                        ${data.priority === "high" ? "2 hours" : data.priority === "medium" ? "24 hours" : "48 hours"}
                    </strong>
                </div>
            </div>
            
            <div style="background-color: #374151; padding: 25px; border-radius: 8px; margin: 25px 0;">
                <div style="color: #B8860B; font-weight: 600; margin-bottom: 15px;">🔍 While You Wait</div>
                <p style="color: #d1d5db; margin-bottom: 15px;">
                    You might find these resources helpful:
                </p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 50%; padding: 8px;">
                            <a href="https://recipevault.com/help" style="color: #60a5fa; text-decoration: none; padding: 8px; background-color: #1f2937; border-radius: 4px; text-align: center; font-size: 14px; display: block;">📚 Help Center</a>
                        </td>
                        <td style="width: 50%; padding: 8px;">
                            <a href="https://recipevault.com/docs" style="color: #60a5fa; text-decoration: none; padding: 8px; background-color: #1f2937; border-radius: 4px; text-align: center; font-size: 14px; display: block;">📖 Documentation</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 50%; padding: 8px;">
                            <a href="https://recipevault.com/faq" style="color: #60a5fa; text-decoration: none; padding: 8px; background-color: #1f2937; border-radius: 4px; text-align: center; font-size: 14px; display: block;">❓ FAQ</a>
                        </td>
                        <td style="width: 50%; padding: 8px;">
                            <a href="https://recipevault.com/status" style="color: #60a5fa; text-decoration: none; padding: 8px; background-color: #1f2937; border-radius: 4px; text-align: center; font-size: 14px; display: block;">🟢 System Status</a>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style="background-color: #374151; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <div style="color: #B8860B; font-size: 18px; font-weight: 600; margin-bottom: 15px;">📞 Need Urgent Help?</div>
                <div style="color: #d1d5db;">
                    For critical issues, you can also reach us at:<br>
                    📧 <strong><a href="mailto:support@recipevault.com" style="color: #60a5fa; text-decoration: none;">support@recipevault.com</a></strong><br>
                    📞 <strong><a href="tel:+15551234567" style="color: #60a5fa; text-decoration: none;">+1 (555) 123-4567</a></strong><br>
                    🕒 <strong>Mon-Fri, 9AM-6PM PST</strong>
                </div>
            </div>
            
            <p style="color: #9ca3af; font-size: 14px; margin-top: 30px;">
                Please keep this ticket number (#${ticketId}) for your records. 
                You can reply to this email to add more information to your request.
            </p>
        </div>
        
        <div style="background-color: #111827; padding: 30px 20px; text-align: center; border-top: 1px solid #374151;">
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
                <strong>RecipeVault Support Team</strong>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
                123 Culinary Street, San Francisco, CA 94102
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
                © 2024 RecipeVault. All rights reserved.
            </p>
        </div>
    </div>
  `

  return wrapEmailTemplate(content, `Support Request Received - Ticket #${ticketId}`)
}

// Email sending utility functions with Resend integration
export const sendSalesInquiry = async (formData: SalesFormData) => {
  try {
    // Send notification to sales team
    const salesNotificationHtml = generateSalesNotificationEmail(formData)
    const salesResult = await sendEmail({
      to: EMAIL_ADDRESSES.SALES,
      subject: `🚨 New Sales Inquiry from ${formData.company}`,
      html: salesNotificationHtml,
      replyTo: formData.email,
    })

    if (!salesResult.success) {
      console.error("Failed to send sales notification:", salesResult.error)
      return { success: false, error: "Failed to notify sales team" }
    }

    // Send auto-response to customer
    const customerResponseHtml = generateSalesAutoResponseEmail(formData)
    const customerResult = await sendEmail({
      to: formData.email,
      subject: "Thank you for your interest in RecipeVault",
      html: customerResponseHtml,
      replyTo: EMAIL_ADDRESSES.SALES,
    })

    if (!customerResult.success) {
      console.error("Failed to send customer response:", customerResult.error)
      return { success: false, error: "Failed to send confirmation email" }
    }

    return {
      success: true,
      salesEmailId: salesResult.id,
      customerEmailId: customerResult.id,
    }
  } catch (error) {
    console.error("Error sending sales inquiry emails:", error)
    return { success: false, error: "Email service error" }
  }
}

export const sendSupportRequest = async (formData: SupportFormData) => {
  try {
    // Send notification to support team
    const supportNotificationHtml = generateSupportNotificationEmail(formData)
    const supportResult = await sendEmail({
      to: EMAIL_ADDRESSES.SUPPORT,
      subject: `🎫 ${formData.priority.toUpperCase()} Priority: ${formData.subject}`,
      html: supportNotificationHtml,
      replyTo: formData.email,
    })

    if (!supportResult.success) {
      console.error("Failed to send support notification:", supportResult.error)
      return { success: false, error: "Failed to notify support team" }
    }

    // Send auto-response to customer
    const customerResponseHtml = generateSupportAutoResponseEmail(formData)
    const ticketId = `RV-${Date.now().toString().slice(-6)}`
    const customerResult = await sendEmail({
      to: formData.email,
      subject: `Support Request Received - Ticket #${ticketId}`,
      html: customerResponseHtml,
      replyTo: EMAIL_ADDRESSES.SUPPORT,
    })

    if (!customerResult.success) {
      console.error("Failed to send customer response:", customerResult.error)
      return { success: false, error: "Failed to send confirmation email" }
    }

    return {
      success: true,
      supportEmailId: supportResult.id,
      customerEmailId: customerResult.id,
      ticketId,
    }
  } catch (error) {
    console.error("Error sending support request emails:", error)
    return { success: false, error: "Email service error" }
  }
}
