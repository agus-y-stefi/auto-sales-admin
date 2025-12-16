import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatCurrency} from "@/lib/format";
import {fetchPayments} from "@/contracts";


export const PaymentsTable = async ({orderId} : {orderId: string}) => {

    const payments = await fetchPayments(parseInt(orderId))

    const totalPaid = payments.reduce((total, payment) =>
            total + payment.amount
        , 0);

    return <React.Fragment>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Pagos Registrados</CardTitle>
                    <CardDescription>Historial de pagos de la orden ({payments.length} pagos)</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4"/>
                    Agregar Pago
                </Button>
            </CardHeader>
            <CardContent>
                {payments.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha de Pago</TableHead>
                                <TableHead>Monto</TableHead>
                                <TableHead>Método de Pago</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={(payment.checkNumber + " - " + payment.orderNumber)}>
                                    <TableCell>{new Date(payment.paymentDate).toLocaleDateString("es-ES")}</TableCell>
                                    <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                                    <TableCell>check</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell className="font-medium">Total Pagado</TableCell>
                                <TableCell className="font-bold">{formatCurrency(totalPaid)}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">No hay pagos registrados aún</p>
                    </div>
                )}
            </CardContent>
        </Card>
    </React.Fragment>
}