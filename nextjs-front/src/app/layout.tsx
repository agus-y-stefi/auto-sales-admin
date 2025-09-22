import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import PersistentDrawerLeft from "@/app/components/sidebar";

import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Gestión de Ventas",
    description: "Sistema de gestión de ventas",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
        <body className={`${inter.className} min-h-screen`}>
            <PersistentDrawerLeft>
                {/* Your page content will be rendered inside the Main component of the sidebar */}
                {children}
                <Toaster />
            </PersistentDrawerLeft>
        </body>
        </html>
    )
}