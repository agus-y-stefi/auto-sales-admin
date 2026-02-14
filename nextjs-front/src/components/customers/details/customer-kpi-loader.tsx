import { CheckCircle, Wallet, Banknote, TriangleAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCustomerOrdersInfo } from "@/contracts/orders-service/api";
import { CustomerKpiCards } from "@/components/customers/details/customer-kpi-cards";
import type { CustomersStatsDTO } from "@/contracts/orders-service/models";

interface KpiCardsLoaderProps {
    customerId: number;
}

async function getStats(customerId: number): Promise<CustomersStatsDTO> {
    const response = await getCustomerOrdersInfo(customerId, { cache: "no-store" });

    if (response.status !== 200) {
        throw new Error(`Unexpected status when fetching customer stats: ${response.status}`);
    }

    return response.data as unknown as CustomersStatsDTO;
}

function KpiCardsError() {
    return (
        <div className="space-y-4">
            <div className="bg-card rounded-xl border shadow-sm p-6 flex flex-col items-center justify-center text-center min-h-50">
                <TriangleAlert className="h-6 w-6 text-red-500 mb-3" />
                <h3 className="text-sm font-semibold text-foreground">
                    No se pudieron cargar las estadísticas
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                    Intenta nuevamente en unos minutos.
                </p>
            </div>
        </div>
    );
}

export function KpiCardsSkeleton() {
    return (
        <div className="space-y-4">
            <div className="bg-card rounded-xl border shadow-sm p-5 flex items-center justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4" />
                        Estado de Cuenta
                    </div>
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <div className="bg-card rounded-xl border shadow-sm p-5 flex items-center justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Wallet className="h-4 w-4" />
                        Deuda Actual
                    </div>
                    <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <div className="bg-card rounded-xl border shadow-sm p-5 flex items-center justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Banknote className="h-4 w-4" />
                        Ventas Totales
                    </div>
                    <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full" />
            </div>
        </div>
    );
}

export async function KpiCardsLoader({ customerId }: KpiCardsLoaderProps) {
    let stats: CustomersStatsDTO;

    try {
        stats = await getStats(customerId);
    } catch (error) {
        console.error("Error fetching customer stats", { customerId, error });
        return <KpiCardsError />;
    }

    return <CustomerKpiCards stats={stats} />;
}
