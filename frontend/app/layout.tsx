import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MindCare Assistant - Your Personal Wellbeing Companion",
  description: "Chat, track your mood, and access self-care resources 24/7",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navigation />
          <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
