import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Package, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export interface RecentOrderRow {
    orderNumber: number;
    orderDate: string;
    status: string;
    totalPrice: number;
}

interface RecentOrdersTableProps {
    customerId: number;
    orders: RecentOrderRow[];
}

export function RecentOrdersTable({ customerId, orders }: RecentOrdersTableProps) {
    const formatDate = (value: string) => {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "-";
        }

        return format(date, "dd MMM yyyy", { locale: es });
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Shipped":
                return "default"; // or success color if available
            case "In Process":
                return "secondary";
            case "On Hold":
                return "destructive";
            case "Cancelled":
                return "destructive";
            default:
                return "outline";
        }
    };

    return (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Package className="text-muted-foreground h-4 w-4" />
                    Últimas 5 Órdenes
                </h3>
                <Link
                    href={`/customers/${customerId}/orders`}
                    className="text-xs text-primary hover:text-blue-600 font-medium flex items-center gap-1"
                >
                    Ver todas
                    <ArrowRight className="h-3 w-3" />
                </Link>
            </div>

            <div className="overflow-x-auto">
                {orders.length === 0 ? (
                    <div className="p-6 text-center">
                        <p className="text-sm text-muted-foreground">No hay órdenes recientes.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    ID
                                </TableHead>
                                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Fecha
                                </TableHead>
                                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Total
                                </TableHead>
                                <TableHead className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Estado
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-border">
                            {orders.map((order) => (
                                <TableRow
                                    key={order.orderNumber}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    <TableCell className="px-4 py-3 text-sm font-medium text-foreground">
                                        #{order.orderNumber}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm text-foreground">
                                        {formatDate(order.orderDate)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm font-medium text-foreground">
                                        {formatCurrency(order.totalPrice)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        <Badge
                                            variant={getStatusVariant(order.status)}
                                            className="capitalize shadow-none"
                                        >
                                            {order.status}
                                        </Badge>
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
