"use client"

import React, { type JSX, useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { MoreVertical, Edit, Trash2 } from "lucide-react"

import { TableTopContent } from "./table-top-customers"
import { formatCurrency } from "@/lib/format"
import type { IPage, ICustomersTableHome } from "@/contracts"
import {
    type CellKey,
    columnsCustomersTableHome, statusOptionsTableHome,
} from "@/lib/config/tables/customer-home.config"
import { deleteCustomer } from "@/contracts"
import {NewCustomerModal} from "@/components/customers-home/new/new-customer-modal";
import {PaginationBottom} from "@/components/pagination_bottom";
import {useSortedItems} from "@/hooks/use_sort";

const useDelete = (setCustomers: React.Dispatch<React.SetStateAction<ICustomersTableHome[]>>) => {
    const handleDelete = (customerNumber: number) => {
        deleteCustomer(customerNumber)
            .then(() => {
                setCustomers((prevState) => prevState.filter((customer) => customer.customerNumber !== customerNumber))

                toast.success("Eliminación Exitosa", {
                    description: "El cliente ha sido eliminado correctamente.",
                })
            })
            .catch((error) => {
                console.error("Error al eliminar:", error)

                toast.error("Error al Eliminar", {
                    description: "Hubo un problema al eliminar el cliente. Por favor, inténtalo de nuevo.",
                })
            })
    }

    return { handleDelete }
}




export function CustomersTable({
                                   customersPage,
                               }: { customersPage: IPage<ICustomersTableHome> }) {
    const [customers, setCustomers] = useState(customersPage.content)

    useEffect(() => {
        setCustomers(customersPage.content)
    }, [customersPage.content])


    const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false)

    const { sortedItems, sortDescriptor, handleSort } = useSortedItems(customers)


    const renderCell = (uid: CellKey, item: ICustomersTableHome): JSX.Element => {

        if (uid === "actions") {
            const { handleDelete } = useDelete(setCustomers)
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(item.customerNumber)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }

        if (uid === "status") {
            const status = statusOptionsTableHome.find((option) => option.uid === item.status)
            const getStatusVariant = (color: string) => {
                switch (color) {
                    case "success":
                        return "default"
                    case "danger":
                        return "destructive"
                    case "warning":
                        return "secondary"
                    default:
                        return "outline"
                }
            }

            return <Badge variant={getStatusVariant(status?.color ?? "default")}>{status?.name ?? item.status}</Badge>
        }

        if (uid === "creditLimit") {
            return <span className="text-muted-foreground font-medium">{formatCurrency(item[uid])}</span>
        }

        if (uid === "customerNumber") {
            return <span className="text-muted-foreground font-medium">{item[uid]}</span>
        }

        return <span className="text-foreground">{item[uid as keyof ICustomersTableHome] ?? ""}</span>
    }

    return <React.Fragment>
        <NewCustomerModal open={isNewCustomerModalOpen} onOpenChange={setIsNewCustomerModalOpen} />
        <div className="space-y-4">
            <TableTopContent customersLength={customers.length} setIsNewCustomerModalOpen={setIsNewCustomerModalOpen} />

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columnsCustomersTableHome.map((column) => (
                                <TableHead
                                    key={column.uid}
                                    className={`${column.uid === "actions" ? "text-center" : "text-left"} ${column.sortable ? "cursor-pointer hover:bg-muted/50" : ""}`}
                                    onClick={column.sortable ? () => handleSort(column.uid) : undefined}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.name}
                                        {column.sortable && sortDescriptor.column === column.uid && (
                                            <span className="text-xs">{sortDescriptor.direction === "ascending" ? "↑" : "↓"}</span>
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columnsCustomersTableHome.length} className="text-center py-8">
                                    No se encontraron clientes
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedItems.map((item) => (
                                <TableRow key={item.customerNumber}>
                                    {columnsCustomersTableHome.map((column) => (
                                        <TableCell key={column.uid} className={column.uid === "actions" ? "text-center" : ""}>
                                            {renderCell(column.uid as CellKey, item)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <PaginationBottom pages={customersPage.metadata.totalPages || 1} />
        </div>
    </React.Fragment>
}

export default CustomersTable

