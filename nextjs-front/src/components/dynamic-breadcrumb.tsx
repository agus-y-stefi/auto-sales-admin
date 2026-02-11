"use client";

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Mapeo de segmentos de URL a labels en español.
// Solo tenés que agregar nuevos segmentos acá cuando se creen nuevas rutas.
const segmentLabels: Record<string, string> = {
    customers: "Clientes",
    new: "Nuevo",
    catalog: "Catálogo",
    orders: "Órdenes",
    reports: "Reportes",
};

function getLabel(segment: string): string {
    return segmentLabels[segment] ?? segment;
}

export function DynamicBreadcrumb() {
    const pathname = usePathname();

    // Separar pathname en segmentos, filtrar vacíos
    const segments = pathname.split("/").filter(Boolean);

    // Construir items con href acumulativo
    const items = segments.map((segment, index) => ({
        label: getLabel(segment),
        href: "/" + segments.slice(0, index + 1).join("/"),
    }));

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <div key={item.href} className="flex items-center gap-1.5 sm:gap-2.5">
                            <BreadcrumbSeparator>
                                <ChevronRight className="h-4 w-4" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
