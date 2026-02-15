import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api/products-api";
import { ProductHeader } from "@/components/products/details/product-header";
import { ProductInfoCard, ProductPricingCard } from "@/components/products/details/product-info-card";
import { ProductDescriptionCard } from "@/components/products/details/product-description-card";
import { ProductLifecycleActions } from "@/components/products/details/product-lifecycle-actions";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
    const { id } = await params;

    const product = await getProduct(id);

    if (!product) {
        return notFound();
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <ProductHeader product={product} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ProductInfoCard product={product} />
                    </div>
                    <div className="lg:col-span-1">
                        <ProductPricingCard product={product} />
                    </div>
                </div>

                <ProductDescriptionCard product={product} />

                <ProductLifecycleActions productCode={product.productCode} />
            </div>
        </div>
    );
}
