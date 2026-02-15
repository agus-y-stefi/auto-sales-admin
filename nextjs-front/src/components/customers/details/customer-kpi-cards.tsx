import React from "react";
import type { CustomersStatsDTO } from "@/contracts/orders-service/models";
import { CheckCircle, Wallet, Banknote } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

interface CustomerKpiCardsProps {
    stats: CustomersStatsDTO;
}

export function CustomerKpiCards({ stats }: CustomerKpiCardsProps) {
    const totalSales = stats.totalOrden ?? 0;
    const totalPaid = stats.totalPagado ?? 0;
    const currentDebt = Math.max(totalSales - totalPaid, 0);
    const isUpToDate = currentDebt <= 0;

    return (
        <div className="space-y-4">
            {/* Account Status */}
            <div className="bg-card rounded-xl border shadow-sm p-5 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Estado de Cuenta</p>
                    <div className="mt-1">
                        <span
                            className={cn(
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                isUpToDate
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
                            )}
                        >
                            {isUpToDate ? "Al Día" : "Deuda Pendiente"}
                        </span>
                    </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400">
                    <CheckCircle className="h-6 w-6" />
                </div>
            </div>

            {/* Current Debt */}
            <div className="bg-card rounded-xl border shadow-sm p-5 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Deuda Actual</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                        {formatCurrency(currentDebt)}
                    </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                    <Wallet className="h-6 w-6" />
                </div>
            </div>

            {/* Total Sales */}
            <div className="bg-card rounded-xl border shadow-sm p-5 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Ventas Totales</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                        {formatCurrency(totalSales)}
                    </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400">
                    <Banknote className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
