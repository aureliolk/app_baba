import type { Metadata } from 'next'
import { Inter as FontSans, Audiowide } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "@/styles/globals.css"


export const audiowide = Audiowide({
  weight:["400"],
  subsets:['latin-ext'],
  variable:"--font-audiowide"
})

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Baba Dos Amigo',
  description: 'Melhor baba de Ilhéus',
}

import { cn } from "@/lib/utils"
import { SiteHeader } from '@/components/site-header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-[#0C0A09] font-sans antialiased",
        fontSans.variable,
        audiowide.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
