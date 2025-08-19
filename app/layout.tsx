import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Manrope } from "next/font/google"
import { ComparisonProvider } from "@/contexts/comparison-context"
import ComparisonBar from "@/components/comparison-bar"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "CollegeCompass - Engineering & Medical College Analysis",
  description:
    "Comprehensive platform for students to analyze and compare engineering and medical colleges for admissions",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <body>
        <ComparisonProvider>
          {children}
          <ComparisonBar />
        </ComparisonProvider>
      </body>
    </html>
  )
}
