import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { Navigation } from "@/components/navigation"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Cupcake Store - Deliciosos Cupcakes Artesanais",
  description: "Peça seus cupcakes favoritos online. Sabores tradicionais, veganos e sem glúten disponíveis.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <CartProvider>
          <Navigation />
          <main className="pt-16">{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
