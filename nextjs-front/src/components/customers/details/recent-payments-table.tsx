import React from "react";
import { mockPayments } from "@/lib/mock-transactions";
import { formatCurrency } from "@/lib/format";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface RecentPaymentsTableProps {
    customerId: number;
}

export function RecentPaymentsTable({ customerId }: RecentPaymentsTableProps) {
    const payments = mockPayments
        .filter((p) => p.customerNumber === customerId)
        .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
        .slice(0, 3);

    return (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <CreditCard className="text-muted-foreground h-4 w-4" />
                    Últimos Pagos
                </h3>
                <Link
                    href={`/customers/${customerId}/payments`}
                    className="text-xs text-primary hover:text-blue-600 font-medium flex items-center gap-1"
                >
                    Ver historial
                    <ArrowRight className="h-3 w-3" />
                </Link>
            </div>

            <div className="overflow-x-auto">
                {payments.length === 0 ? (
                    <div className="p-6 text-center">
                        <p className="text-sm text-muted-foreground">No hay pagos recientes.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Referencia
                                </TableHead>
                                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Fecha
                                </TableHead>
                                <TableHead className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Monto
                                </TableHead>
                                <TableHead className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Método
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-border">
                            {payments.map((payment) => (
                                <TableRow
                                    key={payment.checkNumber}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    <TableCell className="px-4 py-3 text-sm font-mono text-foreground">
                                        {payment.checkNumber}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm text-foreground">
                                        {format(new Date(payment.paymentDate), "dd MMM yyyy", {
                                            locale: es,
                                        })}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm font-medium text-right text-foreground">
                                        {formatCurrency(payment.amount)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm text-center text-muted-foreground">
                                        {payment.paymentMethod}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
