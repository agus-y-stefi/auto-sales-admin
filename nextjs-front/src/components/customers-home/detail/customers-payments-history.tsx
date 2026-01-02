import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { Plus} from "lucide-react";
import Link from "next/link";
import React from "react";

export const CustomersPaymentsHistory = () => {

    const recentPayments = [
        {
            paymentId: 1,
            paymentDate: "2024-05-12",
            orderNumber: 10100,
            paymentMethod: "Tarjeta de Crédito",
            amount: 2500.0,
        },
        {
            paymentId: 2,
            paymentDate: "2024-04-25",
            orderNumber: 10099,
            paymentMethod: "PayPal",
            amount: 500.0,
        },
        {
            paymentId: 3,
            paymentDate: "2024-04-18",
            orderNumber: 10098,
            paymentMethod: "Transferencia Bancaria",
            amount: 0.0,
        },
    ];

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Historial de Pagos</CardTitle>
                        <CardDescription>
                            Pagos recientes del cliente ({recentPayments.length}{" "}
                            mostrados)
                        </CardDescription>
                    </div>
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Registrar Pago
                    </Button>
                </CardHeader>
                <CardContent>
                    {recentPayments.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Orden</TableHead>
                                    <TableHead>Método</TableHead>
                                    <TableHead className="text-right">
                                        Monto
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentPayments.map((payment) => (
                                    <TableRow key={payment.paymentId}>
                                        <TableCell>
                                            {new Date(
                                                payment.paymentDate
                                            ).toLocaleDateString("es-ES")}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/orders/${payment.orderNumber}`}
                                                className="text-primary hover:underline"
                                            >
                                                #{payment.orderNumber}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {payment.paymentMethod}
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {formatCurrency(payment.amount)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                No hay pagos registrados
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
