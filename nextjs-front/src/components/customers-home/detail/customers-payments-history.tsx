import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IPayment, getRecentPayments } from "@/contracts";
import { formatCurrency } from "@/lib/format";
import { Plus} from "lucide-react";
import Link from "next/link";
import React from "react";

export const CustomersPaymentsHistory = ({recentPayments} : {recentPayments : IPayment[]}) => {

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
                                    <TableHead>Numero Cheque</TableHead>
                                    <TableHead className="text-right">
                                        Monto
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentPayments.map((payment) => (
                                    <TableRow key={`${payment.orderNumber}-${payment.checkNumber}`}>
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
                                            {payment.checkNumber}
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
