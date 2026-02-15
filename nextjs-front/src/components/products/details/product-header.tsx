import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { ArrowLeft, Edit, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductHeaderProps {
    product: Product;
}

const scaleColors: Record<string, string> = {
    "1:10": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "1:12": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "1:18": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
    "1:24": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
    "1:32": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "1:50": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "1:72": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    "1:700": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function ProductHeader({ product }: ProductHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                    <Package className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">
                        {product.productName}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground font-mono">
                            {product.productCode}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <Badge variant="secondary" className="text-xs">
                            {product.productLine}
                        </Badge>
                        <Badge
                            variant="outline"
                            className={cn(
                                "text-xs border-0",
                                scaleColors[product.productScale] ??
                                    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
                            )}
                        >
                            {product.productScale}
                        </Badge>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                    <Link href="/products">
                        <ArrowLeft className="h-4 w-4" />
                        Volver
                    </Link>
                </Button>
                {/* TODO: link to edit page when implemented */}
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Edit className="h-4 w-4" />
                    Editar Producto
                </Button>
            </div>
        </div>
    );
}
