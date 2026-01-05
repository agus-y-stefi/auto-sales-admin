import { Card, CardContent } from "@/components/ui/card";
import { ICustomersStats } from "@/contracts";
import { formatCurrency } from "@/lib/format";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import React from "react";

export const CustomersDebtCard = ({
    statistics,
}: {
    statistics: ICustomersStats;
}) => {
    const isPaidInFull = true; // Example condition

    const {
        cantidadOrdenes,
        ordenesCompletadas,
        precioPromedio,
        totalOrden,
        totalPagado,
    } = statistics;

    const deudaPendiente = totalOrden - totalPagado;

    return (
        <React.Fragment>
            <Card
                className={
                    isPaidInFull
                        ? "border-green-200 bg-green-50"
                        : "border-yellow-200 bg-yellow-50"
                }
            >
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {isPaidInFull ? (
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            ) : (
                                <AlertCircle className="h-6 w-6 text-yellow-600" />
                            )}
                            <div>
                                <p className="font-semibold text-lg">
                                    {isPaidInFull
                                        ? "Cliente al Día"
                                        : "Pagos Pendientes"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {isPaidInFull
                                        ? `Todas las órdenes están pagadas`
                                        : `Deuda pendiente: ${formatCurrency(
                                              deudaPendiente
                                          )}`}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                                Total Gastado
                            </p>
                            <p className="text-2xl font-bold">
                                {formatCurrency(totalOrden)}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
