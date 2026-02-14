import React from "react";
import { Package, Star } from "lucide-react";

export interface TopProductRow {
    productName: string;
    category?: string;
    quantity: number;
}

interface TopProductsCardProps {
    products: TopProductRow[];
}

export function TopProductsCard({ products }: TopProductsCardProps) {
    return (
        <div className="bg-card rounded-xl border shadow-sm p-6">
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="text-muted-foreground h-5 w-5" />
                Top 3 Productos Más Comprados
            </h3>
            {products.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">No hay productos comprados.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map((product, index) => (
                        <div
                            key={`${product.productName}-${index}`}
                            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/50"
                        >
                            <div className="h-12 w-12 rounded bg-background flex items-center justify-center border border-border">
                                <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                    {product.productName}
                                </p>
                                {product.category && (
                                    <p className="text-xs text-muted-foreground truncate">
                                        {product.category}
                                    </p>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-foreground">{product.quantity}</p>
                                <p className="text-[10px] text-muted-foreground uppercase">Cant.</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
