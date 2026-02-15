import React from "react";
import { Product } from "@/types/product";
import { StockBadge } from "@/components/products/stock-badge";
import { formatCurrency } from "@/lib/format";
import { Boxes, DollarSign, Tag, Truck } from "lucide-react";

interface ProductInfoCardProps {
    product: Product;
}

export function ProductInfoCard({ product }: ProductInfoCardProps) {
    const margin = product.msrp > 0
        ? (((product.msrp - product.buyPrice) / product.msrp) * 100).toFixed(1)
        : "0.0";

    return (
        <div className="bg-card rounded-xl border shadow-sm p-6 h-full">
            <h3 className="text-base font-semibold text-foreground mb-6 flex items-center gap-2">
                <Tag className="text-muted-foreground h-5 w-5" />
                Información del Producto
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Nombre
                    </span>
                    <span className="text-sm font-medium text-foreground">
                        {product.productName}
                    </span>
                </div>

                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Fabricante
                    </span>
                    <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                            {product.productVendor}
                        </span>
                    </div>
                </div>

                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Línea de Producto
                    </span>
                    <span className="text-sm text-foreground">{product.productLine}</span>
                </div>

                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Escala
                    </span>
                    <span className="text-sm text-foreground">{product.productScale}</span>
                </div>

                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Stock Disponible
                    </span>
                    <div className="flex items-center gap-2">
                        <Boxes className="h-4 w-4 text-muted-foreground" />
                        <StockBadge quantity={product.quantityInStock} />
                        <span className="text-sm text-muted-foreground">unidades</span>
                    </div>
                </div>

                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Margen Bruto
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {margin}%
                    </span>
                </div>
            </div>
        </div>
    );
}

export function ProductPricingCard({ product }: ProductInfoCardProps) {
    const margin = product.msrp > 0
        ? product.msrp - product.buyPrice
        : 0;

    return (
        <div className="space-y-4">
            <div className="bg-card rounded-xl border shadow-sm p-5 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Precio de Compra</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                        {formatCurrency(product.buyPrice)}
                    </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                    <DollarSign className="h-6 w-6" />
                </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-5 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">MSRP</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                        {formatCurrency(product.msrp)}
                    </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400">
                    <DollarSign className="h-6 w-6" />
                </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-5 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Margen Unitario</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                        {formatCurrency(margin)}
                    </p>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-600 dark:text-emerald-400">
                    <DollarSign className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
