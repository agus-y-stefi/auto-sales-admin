"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { StockBadge } from "@/components/products/stock-badge";
import { formatCurrency } from "@/lib/format";
import { Boxes, DollarSign, Edit, Tag, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateProductAction } from "@/lib/actions/product.actions";

interface ProductInfoCardProps {
    product: Product;
}

export function ProductInfoCard({ product }: ProductInfoCardProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [quantityInStock, setQuantityInStock] = useState(product.quantityInStock);
    const [isPending, startTransition] = useTransition();

    const margin = product.msrp > 0
        ? (((product.msrp - product.buyPrice) / product.msrp) * 100).toFixed(1)
        : "0.0";

    const handleSave = () => {
        if (quantityInStock < 0) {
            toast.error("El stock no puede ser negativo.");
            return;
        }
        startTransition(async () => {
            const result = await updateProductAction(product.productCode, {
                quantityInStock,
            });
            if (result.success) {
                toast.success("Stock actualizado correctamente.");
                setIsEditing(false);
                router.refresh();
            } else {
                toast.error(result.error);
            }
        });
    };

    const handleCancel = () => {
        setQuantityInStock(product.quantityInStock);
        setIsEditing(false);
    };

    return (
        <div className="bg-card rounded-xl border shadow-sm p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <Tag className="text-muted-foreground h-5 w-5" />
                    Información del Producto
                </h3>
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isPending}>
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSave} disabled={isPending}>
                            {isPending ? "Guardando..." : "Guardar"}
                        </Button>
                    </div>
                ) : (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                    </Button>
                )}
            </div>

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
                    {isEditing ? (
                        <Input
                            type="number"
                            min={0}
                            max={32767}
                            value={quantityInStock}
                            onChange={(e) => setQuantityInStock(parseInt(e.target.value) || 0)}
                            className="h-8 w-32 text-sm"
                        />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Boxes className="h-4 w-4 text-muted-foreground" />
                            <StockBadge quantity={product.quantityInStock} />
                            <span className="text-sm text-muted-foreground">unidades</span>
                        </div>
                    )}
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
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [buyPrice, setBuyPrice] = useState(product.buyPrice);
    const [msrp, setMsrp] = useState(product.msrp);
    const [isPending, startTransition] = useTransition();

    const displayBuyPrice = isEditing ? buyPrice : product.buyPrice;
    const displayMsrp = isEditing ? msrp : product.msrp;
    const margin = displayMsrp > 0 ? displayMsrp - displayBuyPrice : 0;
    const marginPct = displayMsrp > 0
        ? ((margin / displayMsrp) * 100).toFixed(1)
        : "0.0";

    const handleSave = () => {
        if (buyPrice < 0 || msrp < 0) {
            toast.error("Los precios no pueden ser negativos.");
            return;
        }
        startTransition(async () => {
            const result = await updateProductAction(product.productCode, {
                buyPrice,
                msrp,
            });
            if (result.success) {
                toast.success("Precios actualizados correctamente.");
                setIsEditing(false);
                router.refresh();
            } else {
                toast.error(result.error);
            }
        });
    };

    const handleCancel = () => {
        setBuyPrice(product.buyPrice);
        setMsrp(product.msrp);
        setIsEditing(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <DollarSign className="text-muted-foreground h-5 w-5" />
                    Datos Financieros
                </h3>
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isPending}>
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSave} disabled={isPending}>
                            {isPending ? "Guardando..." : "Guardar"}
                        </Button>
                    </div>
                ) : (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                    </Button>
                )}
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-5 flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Precio de Compra</p>
                    {isEditing ? (
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-lg font-bold text-foreground">$</span>
                            <Input
                                type="number"
                                min={0}
                                step={0.01}
                                value={buyPrice}
                                onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                                className="h-9 w-28 text-lg font-bold"
                            />
                        </div>
                    ) : (
                        <p className="text-2xl font-bold text-foreground mt-1">
                            {formatCurrency(displayBuyPrice)}
                        </p>
                    )}
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                    <DollarSign className="h-6 w-6" />
                </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-5 flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">MSRP</p>
                    {isEditing ? (
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-lg font-bold text-foreground">$</span>
                            <Input
                                type="number"
                                min={0}
                                step={0.01}
                                value={msrp}
                                onChange={(e) => setMsrp(parseFloat(e.target.value) || 0)}
                                className="h-9 w-28 text-lg font-bold"
                            />
                        </div>
                    ) : (
                        <p className="text-2xl font-bold text-foreground mt-1">
                            {formatCurrency(displayMsrp)}
                        </p>
                    )}
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
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {marginPct}% de margen
                    </p>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-600 dark:text-emerald-400">
                    <DollarSign className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
