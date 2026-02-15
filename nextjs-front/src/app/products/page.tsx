import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/products/products-table";
import { PaginationControl } from "@/components/customers/pagination-control";
import { ProductsToolbar } from "@/components/products/products-toolbar";
import { columns } from "@/components/products/columns";
import { getProducts } from "@/lib/api/products-api";
import { getProductLines } from "@/lib/api/products-api";
import { searchParamsCache } from "./search-params";
import { SearchParams } from "nuqs/server";
import Link from "next/link";

interface PageProps {
    searchParams: Promise<SearchParams>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
    const { page, size, q, productLine, productScale } = searchParamsCache.parse(await searchParams);

    // Fetch data in parallel
    const [productsData, productLines] = await Promise.all([
        getProducts({ page, size, q, productLine, productScale }),
        getProductLines(),
    ]);

    const { content, totalElements, totalPages } = productsData;

    // Extract unique scales for the filter
    const scaleOptions = [...new Set(content.map((p) => p.productScale).filter(Boolean))].sort();

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Catálogo de Productos</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Gestiona el inventario, precios y disponibilidad de productos.
                    </p>
                </div>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-none">
                    <Link href="/products/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Producto
                    </Link>
                </Button>
            </div>

            {/* Toolbar Card */}
            <Suspense>
                <ProductsToolbar
                    productLines={productLines.map((pl) => pl.productLine)}
                    scaleOptions={scaleOptions}
                />
            </Suspense>

            {/* Table Card */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-zinc-900 overflow-hidden">
                <div>
                    <ProductsTable columns={columns} data={content} />
                </div>

                <div className="p-4 border-t bg-muted/5 dark:bg-muted/10">
                    <Suspense>
                        <PaginationControl totalPages={totalPages} totalElements={totalElements} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
