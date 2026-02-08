import React, { type JSX } from "react";
import {
    Table,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react";

import { TableTopOrders } from "./table-top-orders";
import { formatCurrency } from "@/lib/format";
import type { IPage, IOrderTableHome } from "@/contracts";
import {
    columnsOrdersTableHome,
    type OrderCellKey,
    statusOptionsOrdersTableHome,
} from "@/lib/config/tables/order-home.config";
import { redirect } from "next/navigation";
import { TableProvider } from "../table-provider";

export function OrdersTable({
    ordersPage,
}: {
    ordersPage: IPage<IOrderTableHome>;
}) {

    const orders = ordersPage.content;

    const renderCell = (
        uid: OrderCellKey,
        item: IOrderTableHome
    ): JSX.Element => {
        if (uid === "actions") {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                redirect(`/orders/${item.orderNumber}`)
                            }
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }

        if (uid === "status") {
            const status = statusOptionsOrdersTableHome.find((option) => {
                return option.uid.toLowerCase() === item.status.toLowerCase();
            });

            // @ts-ignore
            return (
                <Badge variant={status?.color ?? "outline"}>
                    {status?.name ?? item.status}
                </Badge>
            );
        }

        if (uid === "total") {
            return (
                <span className="text-muted-foreground font-medium">
                    {formatCurrency(item[uid])}
                </span>
            );
        }

        if (uid === "orderNumber") {
            return (
                <span className="text-muted-foreground font-medium">
                    #{item[uid]}
                </span>
            );
        }

        if (uid === "orderDate") {
            return (
                <span className="text-foreground">
                    {new Date(item[uid]).toLocaleDateString("es-ES")}
                </span>
            );
        }

        return (
            <span className="text-foreground">
                {item[uid as keyof IOrderTableHome] ?? ""}
            </span>
        );
    };

    return (
        <React.Fragment>
            <div className="space-y-4">
                <TableTopOrders />
                <TableProvider
                    columns={columnsOrdersTableHome}
                    pages={ordersPage.metadata.totalPages || 1}
                >
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={columnsOrdersTableHome.length}
                                className="text-center py-8"
                            >
                                No se encontraron órdenes
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((item) => (
                            <TableRow key={item.orderNumber}>
                                {columnsOrdersTableHome.map((column) => (
                                    <TableCell
                                        key={column.uid}
                                        className={
                                            column.uid === "actions"
                                                ? "text-center"
                                                : ""
                                        }
                                    >
                                        {renderCell(
                                            column.uid as OrderCellKey,
                                            item
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableProvider>
            </div>
        </React.Fragment>
    );
}

export default OrdersTable;
