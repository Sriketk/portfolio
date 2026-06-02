import type React from "react"
import type { Metadata } from "next"
import { Quicksand, Nanum_Myeongjo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-sans" })
const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Sriket Komali",
  description: "Personal portfolio and blog",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${quicksand.variable} ${nanumMyeongjo.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-3xl px-10 py-8 md:py-12">
              <Header />
              <main className="mt-10">{children}</main>
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
