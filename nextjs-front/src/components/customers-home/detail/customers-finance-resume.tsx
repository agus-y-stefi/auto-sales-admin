import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ICustomersStats } from "@/contracts";
import { formatCurrency } from "@/lib/format";
import { AlertCircle, Calendar, Clock, CreditCard, DollarSign } from "lucide-react";
import React from "react";

export const CustomersFinanceResume = ({stats} : {stats : ICustomersStats}) => {

        
    const statistics = {
        ...stats,
        pagosPendientes: stats.totalOrden - stats.totalPagado,
        averagePaymentDays: 30,
    };

    return (
        <React.Fragment>
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Resumen Financiero</CardTitle>
                    <CardDescription>
                        Estado de cuenta del cliente
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Total Gastado
                                </span>
                            </div>
                            <p className="font-semibold">
                                {formatCurrency(statistics.totalOrden)}
                            </p>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Total Pagado
                                </span>
                            </div>
                            <p className="font-semibold text-green-600">
                                {formatCurrency(statistics.totalPagado)}
                            </p>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Pagos Pendientes
                                </span>
                            </div>
                            <p
                                className={`font-semibold ${
                                    statistics.pagosPendientes > 0
                                        ? "text-yellow-600"
                                        : "text-green-600"
                                }`}
                            >
                                {formatCurrency(statistics.pagosPendientes)}
                            </p>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Última Orden
                                </span>
                            </div>
                            <p className="font-medium">
                                {statistics.ultimaOrdenFecha
                                    ? new Date(
                                          statistics.ultimaOrdenFecha
                                      ).toLocaleDateString("es-ES")
                                    : "N/A"}
                            </p>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Promedio Días de Pago
                                </span>
                            </div>
                            <p className="font-medium">
                                {statistics.averagePaymentDays} días
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
