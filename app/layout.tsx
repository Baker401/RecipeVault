import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#8B0000",
}

export const metadata: Metadata = {
  title: {
    default: "RecipeVault - Professional Recipe Management",
    template: "%s | RecipeVault",
  },
  description:
    "Professional recipe management platform for restaurants, cafes, and culinary teams. Organize recipes, manage employees, convert measurements, and streamline kitchen operations.",
  keywords: [
    "recipe management",
    "restaurant software",
    "kitchen management",
    "culinary platform",
    "recipe organization",
    "measurement converter",
    "team collaboration",
    "food service",
    "professional kitchen",
    "recipe database",
  ],
  authors: [{ name: "RecipeVault Team" }],
  creator: "RecipeVault",
  publisher: "RecipeVault",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://recipevault.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://recipevault.com",
    siteName: "RecipeVault",
    title: "RecipeVault - Professional Recipe Management",
    description:
      "Professional recipe management platform for restaurants and culinary teams. Organize recipes, manage employees, and streamline kitchen operations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RecipeVault - Professional Recipe Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecipeVault - Professional Recipe Management",
    description: "Professional recipe management platform for restaurants and culinary teams.",
    images: ["/og-image.png"],
    creator: "@recipevault",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: "business",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#8B0000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
