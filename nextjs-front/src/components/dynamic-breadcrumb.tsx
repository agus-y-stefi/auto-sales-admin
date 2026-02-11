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

export function DynamicBreadcrumb() {
    const pathname = usePathname();

    // Map paths to breadcrumb items
    // For now simple switch/if
    let items: { label: string; href?: string }[] = [];

    if (pathname === "/customers") {
        items = [{ label: "Clientes", href: "/customers" }, { label: "Directorio" }];
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                {items.length > 0 && (
                    <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                )}
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <div key={index} className="flex items-center gap-1.5 sm:gap-2.5">
                            <BreadcrumbItem>
                                {isLast || !item.href ? (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && (
                                <BreadcrumbSeparator>
                                    <ChevronRight className="h-4 w-4" />
                                </BreadcrumbSeparator>
                            )}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
