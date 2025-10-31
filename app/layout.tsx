import type React from "react"
import type { Metadata } from "next"
import { Inter, Nanum_Myeongjo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Personal portfolio and blog",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nanumMyeongjo.variable} font-serif antialiased`}>
        <div className="min-h-screen bg-background">
          <div className="mx-auto max-w-2xl px-6 py-8 md:py-12">
            <Header />
            <main className="mt-16">{children}</main>
            <Footer />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
