"use client"

import React, {type JSX, useEffect, useState} from "react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Badge} from "@/components/ui/badge"
import {toast} from "sonner"
import {MoreVertical, Edit, Trash2, Eye} from "lucide-react"

import {TableTopOrders} from "./table-top-orders"
import {formatCurrency} from "@/lib/format"
import type {IPage, IOrderTableHome} from "@/contracts"
import {columnsOrdersTableHome, type OrderCellKey, statusOptionsOrdersTableHome} from "@/lib/config/tables/order-home.config"
import {deleteOrder} from "@/contracts"
import {NewOrderModal} from "@/components/orders-home/new/new-order-modal"
import {PaginationBottom} from "@/components/pagination_bottom";
import {useSortedItems} from "@/hooks/use_sort"
import {TableSizeBottom} from "@/components/table_size_bottom";
import { redirect } from "next/navigation"

const useDelete = (setOrders: React.Dispatch<React.SetStateAction<IOrderTableHome[]>>) => {
    const handleDelete = (orderNumber: number) => {
        deleteOrder(orderNumber)
            .then(() => {
                setOrders((prevState) => prevState.filter((order) => order.orderNumber !== orderNumber))

                toast.success("Eliminación Exitosa", {
                    description: "La orden ha sido eliminada correctamente.",
                })
            })
            .catch((error) => {
                console.error("Error al eliminar:", error)

                toast.error("Error al Eliminar", {
                    description: "Hubo un problema al eliminar la orden. Por favor, inténtalo de nuevo.",
                })
            })
    }

    return {handleDelete}
}

export function OrdersTable({ordersPage}: { ordersPage: IPage<IOrderTableHome> }) {
    const [orders, setOrders] = useState(ordersPage.content)

    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false)
    useEffect(() => {
        setOrders(ordersPage.content)
    }, [ordersPage.content])

    const {handleDelete} = useDelete(setOrders)

    const {sortedItems, sortDescriptor, handleSort} = useSortedItems<IOrderTableHome>(orders)

    const [tipos, setTipos] = useState<Set<string>>(new Set());

    const redirectToDetails = (orderNumber: number) => {
        redirect(`/orders/${orderNumber}`);
    }



    const renderCell = (uid: OrderCellKey, item: IOrderTableHome): JSX.Element => {
        if (uid === "actions") {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreVertical className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => redirectToDetails(item.orderNumber)}>
                            <Eye className="mr-2 h-4 w-4"/>
                            Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4"/>
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(item.orderNumber)}>
                            <Trash2 className="mr-2 h-4 w-4"/>
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }


        if (uid === "status") {
            const status = statusOptionsOrdersTableHome.find((option) => {
                return option.uid.toLowerCase() === item.status.toLowerCase()
            })

            // @ts-ignore
            return <Badge variant={status?.color ?? "outline"}>{status?.name ?? item.status}</Badge>
        }



        if (uid === "total") {
            return <span className="text-muted-foreground font-medium">{formatCurrency(item[uid])}</span>
        }

        if (uid === "orderNumber") {
            return <span className="text-muted-foreground font-medium">#{item[uid]}</span>
        }

        if (uid === "orderDate") {
            return <span className="text-foreground">{new Date(item[uid]).toLocaleDateString("es-ES")}</span>
        }

        return <span className="text-foreground">{item[uid as keyof IOrderTableHome] ?? ""}</span>
    }

    return (
        <React.Fragment>
            <NewOrderModal open={isNewOrderModalOpen} onOpenChange={setIsNewOrderModalOpen}/>
            <div className="space-y-4">
                <TableTopOrders
                    ordersLength={orders.length}
                    statusOptions={statusOptionsOrdersTableHome}
                    setIsNewOrderModalOpen={setIsNewOrderModalOpen}
                />

                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columnsOrdersTableHome.map((column) => (
                                    <TableHead
                                        key={column.uid}
                                        className={`${column.uid === "actions" ? "text-center" : "text-left"} ${column.sortable ? "cursor-pointer hover:bg-muted/50" : ""}`}
                                        onClick={column.sortable ? () => handleSort(column.uid) : undefined}
                                    >
                                        <div className="flex items-center gap-2">
                                            {column.name}
                                            {column.sortable && (
                                                sortDescriptor.column !== column.uid ? (
                                                    <span>↕</span>
                                                ) : (
                                                    <span
                                                        className={`text-xs`}>{sortDescriptor.direction === "ascending" ? "↑" : "↓"}</span>
                                                )
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedItems.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columnsOrdersTableHome.length} className="text-center py-8">
                                        No se encontraron órdenes
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sortedItems.map((item) => (
                                    <TableRow key={item.orderNumber}>
                                        {columnsOrdersTableHome.map((column) => (
                                            <TableCell key={column.uid} className={column.uid === "actions" ? "text-center" : ""}>
                                                {renderCell(column.uid as OrderCellKey, item)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <TableSizeBottom pageInfo={ordersPage.metadata}/>
                </div>

                <PaginationBottom pages={ordersPage.metadata.totalPages || 1}/>
            </div>
        </React.Fragment>
    )
}

export default OrdersTable
