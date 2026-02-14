import { Star, TriangleAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getTopThreeProductsByCustomer } from "@/contracts/product-service/api";
import { TopProductsCard, type TopProductRow } from "@/components/customers/details/top-products-card";

interface TopProductsLoaderProps {
    customerId: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function toString(value: unknown, fallback = "-"): string {
    return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function toNumber(value: unknown, fallback = 0): number {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === "string" && value.trim().length > 0) {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    }
    return fallback;
}

async function getTopProducts(customerId: number): Promise<TopProductRow[]> {
    const response = await getTopThreeProductsByCustomer(customerId);

    if (response.status !== 200) {
        throw new Error(`Unexpected status when fetching top products: ${response.status}`);
    }

    if (!Array.isArray(response.data)) {
        return [];
    }

    return response.data
        .filter(isRecord)
        .map((item) => ({
            productName: toString(item.productName),
            category: toString(item.productDescription) !== "-" ? toString(item.productDescription) : undefined,
            quantity: toNumber(item.cantidadComprada),
        }))
        .filter((p) => p.productName !== "-" && p.quantity > 0);
}

function TopProductsError() {
    return (
        <div className="bg-card rounded-xl border shadow-sm p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <TriangleAlert className="h-6 w-6 text-red-500 mb-3" />
            <h3 className="text-sm font-semibold text-foreground">No se pudieron cargar los productos</h3>
            <p className="text-sm text-muted-foreground mt-2">Intenta nuevamente en unos minutos.</p>
        </div>
    );
}

export function TopProductsSkeleton() {
    return (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-2">
                <Star className="text-muted-foreground h-5 w-5" />
                <h3 className="text-base font-semibold text-foreground">Top 3 Productos Más Comprados</h3>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-20 rounded-lg" />
                    <Skeleton className="h-20 rounded-lg" />
                    <Skeleton className="h-20 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export async function TopProductsLoader({ customerId }: TopProductsLoaderProps) {
    let products: TopProductRow[];

    try {
        products = await getTopProducts(customerId);
    } catch (error) {
        console.error("Error fetching top products", { customerId, error });
        return <TopProductsError />;
    }

    return <TopProductsCard products={products} />;
}
