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
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}



import './globals.css'