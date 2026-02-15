import React from "react";
import { Product } from "@/types/product";
import { FileText } from "lucide-react";

interface ProductDescriptionCardProps {
    product: Product;
}

export function ProductDescriptionCard({ product }: ProductDescriptionCardProps) {
    const description = product.productDescription?.trim();
    const lineDescription = product.productLineDescription?.trim();

    return (
        <div className="bg-card rounded-xl border shadow-sm p-6">
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="text-muted-foreground h-5 w-5" />
                Descripción
            </h3>

            {description ? (
                <p className="text-sm text-foreground leading-relaxed">{description}</p>
            ) : (
                <p className="text-sm text-muted-foreground italic">
                    Este producto no tiene una descripción registrada.
                </p>
            )}

            {lineDescription && (
                <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        Acerca de la línea &quot;{product.productLine}&quot;
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {lineDescription}
                    </p>
                </div>
            )}
        </div>
    );
}
