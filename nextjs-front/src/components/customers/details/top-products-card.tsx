import React from "react";
import { mockProductStats } from "@/lib/mock-transactions";
import { Car, Bike, Truck, Star } from "lucide-react";

interface TopProductsCardProps {
    customerId: number;
}

export function TopProductsCard({ customerId }: TopProductsCardProps) {
    // In a real app, we would filter by customerId, but mock data is static for now
    const products = mockProductStats;

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "Car":
                return <Car className="h-6 w-6 text-muted-foreground" />;
            case "Bike":
                return <Bike className="h-6 w-6 text-muted-foreground" />;
            case "Truck":
                return <Truck className="h-6 w-6 text-muted-foreground" />;
            default:
                return <Car className="h-6 w-6 text-muted-foreground" />;
        }
    };

    return (
        <div className="bg-card rounded-xl border shadow-sm p-6">
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="text-muted-foreground h-5 w-5" />
                Top 3 Productos Más Comprados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/50"
                    >
                        <div className="h-12 w-12 rounded bg-background flex items-center justify-center border border-border">
                            {getIcon(product.categoryIcon || "")}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                                {product.productName}
                            </p>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-foreground">{product.quantity}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">Cant.</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
