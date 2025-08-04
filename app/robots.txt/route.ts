import { NextResponse } from "next/server"

export function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Allow: /pricing
Allow: /contact
Disallow: /admin/
Disallow: /employee/
Disallow: /api/
Disallow: /auth

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || "https://recipevault.com"}/sitemap.xml`

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
