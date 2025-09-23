import { Suspense } from "react"
import { getProductsHomeTable } from "@/contracts"
import ProductsTable from "@/components/product-home/products_table";

interface ProductsPageProps {
    searchParams: {
        page?: string
        status?: string
        query?: string
        sortBy?: string
        sortDirection?: "ascending" | "descending"
    }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const page = Number.parseInt(searchParams.page || "0")
    const status = searchParams.status === "all" ? undefined : searchParams.status
    const query = searchParams.query
    const sortBy = searchParams.sortBy
    const sortDirection = searchParams.sortDirection || "ascending"

    const productsData = await getProductsHomeTable(page, 5)

    const sortDescriptor = sortBy ? { column: sortBy, direction: sortDirection } : undefined

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
            </div>

            <Suspense fallback={<div>Cargando productos...</div>}>
                <ProductsTable
                    products={productsData}
                    sortDescriptor={sortDescriptor}
                />
            </Suspense>
        </div>
    )
}
