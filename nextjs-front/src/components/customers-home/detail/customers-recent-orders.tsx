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
import { formatCurrency } from "@/lib/format";
import { Eye, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export const CustomersRecentOrders = () => {
    const recentOrders = [
        {
            orderNumber: 10100,
            orderDate: "2024-05-10",
            status: "Shipped",
            total: 2500.0,
            totalPaid: 2500.0,
            isPaid: true,
        },
        {
            orderNumber: 10099,
            orderDate: "2024-04-22",
            status: "Processing",
            total: 1500.0,
            totalPaid: 500.0,
            isPaid: false,
        },
        {
            orderNumber: 10098,
            orderDate: "2024-04-15",
            status: "Cancelled",
            total: 800.0,
            totalPaid: 0.0,
            isPaid: false,
        },
    ];

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
                                        {formatCurrency(order.total)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatCurrency(order.totalPaid)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {order.isPaid ? (
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
