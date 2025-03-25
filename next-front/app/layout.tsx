import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/sidebar-provider"
import Sidebar from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gestión de Ventas",
  description: "Plataforma de gestión de ventas",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SidebarProvider>
          <Sidebar />
          <main className="transition-all duration-300 min-h-screen">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  )
}



import './globals.css'