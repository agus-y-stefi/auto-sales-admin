import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import Providers from "./providers";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Gestión de Ventas",
    description: "Sistema de gestión de ventas",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={`${inter.className} min-h-screen`}>
                <Providers>
                    <AppSidebar />
                    <SidebarTrigger className="scale-160 mt-5 ml-5"/>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
