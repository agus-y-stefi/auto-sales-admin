import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IOrderResumeWithPaymentInfo } from "@/contracts";
import { formatCurrency } from "@/lib/format";
import { Eye, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export const CustomersRecentOrders = ({
    recentOrders,
}: {
    recentOrders: IOrderResumeWithPaymentInfo[];
}) => {
    const getOrderStatusLabel = (status: string) => {
        switch (status) {
            case "Shipped":
                return "Enviado";
            case "Processing":
                return "En Proceso";
            case "Cancelled":
                return "Cancelado";
            default:
                return status;
        }
    };

    const getOrderStatusColor = (status: string) => {
        switch (status) {
            case "Shipped":
                return "bg-blue-100 text-blue-800";
            case "Processing":
                return "bg-yellow-100 text-yellow-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "";
        }
    };

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Órdenes Recientes</CardTitle>
                        <CardDescription>
                            Últimas órdenes del cliente ({recentOrders.length}{" "}
                            mostradas)
                        </CardDescription>
                    </div>
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nueva Orden
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Número</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">
                                    Total
                                </TableHead>
                                <TableHead className="text-right">
                                    Pagado
                                </TableHead>
                                <TableHead className="text-center">
                                    Estado Pago
                                </TableHead>
                                <TableHead className="text-center">
                                    Acciones
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map((order) => (
                                <TableRow key={order.orderNumber}>
                                    <TableCell className="font-medium">
                                        #{order.orderNumber}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            order.orderDate
                                        ).toLocaleDateString("es-ES")}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={getOrderStatusColor(
                                                order.status
                                            )}
                                        >
                                            {getOrderStatusLabel(order.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatCurrency(order.paymentInfo.totalAmount)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatCurrency(order.paymentInfo.totalPaidAmount)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {order.paymentInfo.isFullyPaid ? (
                                            <Badge
                                                variant="outline"
                                                className="bg-green-100 text-green-800"
                                            >
                                                Pagado
                                            </Badge>
                                        ) : (
                                            <Badge
                                                variant="outline"
                                                className="bg-yellow-100 text-yellow-800"
                                            >
                                                Pendiente
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Link
                                            href={`/orders/${order.orderNumber}`}
                                        >
                                            <Button variant="ghost" size="icon">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
