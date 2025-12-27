"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ShoppingCart, Package, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Definimos los items basándonos en la imagen y tus rutas
const items = [
    {
        title: "Clientes",
        url: "/customers",
        icon: Users,
    },
    {
        title: "Órdenes",
        url: "/orders", // Coincide con tu estructura de carpetas
        icon: ShoppingCart,
    },
    {
        title: "Productos",
        url: "/products",
        icon: Package,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="border-r-0">
            {/* Fondo oscuro exacto al de la imagen (#171717 es neutral-900/zinc-900 aprox, forzamos el hex) */}
            <SidebarContent className="bg-[#171717] text-zinc-400">
                <SidebarGroup className="mt-10">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-2 px-2 mt-4">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        // Detectamos si es la ruta activa para aplicar el estilo gris
                                        isActive={pathname === item.url}
                                        className="
                                            h-10 
                                            hover:bg-zinc-800 hover:text-white 
                                            data-[active=true]:bg-zinc-800 data-[active=true]:text-white
                                            transition-colors
                                        "
                                    >
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-3"
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-medium text-sm">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
