"use client"

import React, { type JSX, useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { MoreVertical, Edit, Trash2 } from "lucide-react"
import type { SortDescriptor } from "@/contracts"

import { TableTopContent } from "./table-top-customers"
import { TableBottomCustomers } from "./table-bottom-customers"
import { formatCurrency } from "@/lib/format"
import type { IPage, ICustomersTableHome } from "@/contracts"
import {
    type CellKey,
    statusOptionsTableHome,
    columnsCustomersTableHome,
} from "@/lib/config/tables/customer-home.config"
import { deleteCustomer } from "@/contracts"
import {NewCustomerModal} from "@/components/customers-home/new/new-customer-modal";

const useSortedItems = (customers: ICustomersTableHome[]) => {
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "customerName",
        direction: "ascending",
    })

    const sortedItems = React.useMemo(() => {
        return [...customers].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof ICustomersTableHome]
            const second = b[sortDescriptor.column as keyof ICustomersTableHome]
            const cmp = first < second ? -1 : first > second ? 1 : 0

            return sortDescriptor.direction === "descending" ? -cmp : cmp
        })
    }, [sortDescriptor, customers])

    return { sortedItems, setSortDescriptor, sortDescriptor }
}

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

const sampleCustomersPage: IPage<ICustomersTableHome> = {
    content: [
        {
            customerNumber: 103,
            customerName: "Mini Gifts Distributors Ltd.",
            contactName: "Susan Nelson",
            phone: "+1 415-555-1450",
            city: "San Rafael",
            country: "USA",
            creditLimit: 210500.0,
            status: "active",
        },
        {
            customerNumber: 112,
            customerName: "Signal Gift Stores",
            contactName: "Jean King",
            phone: "+1 714-555-2611",
            city: "Las Vegas",
            country: "USA",
            creditLimit: 71800.0,
            status: "inactive",
        },
        {
            customerNumber: 114,
            customerName: "Australian Collectors, Co.",
            contactName: "Peter Ferguson",
            phone: "+61 3 9520 4555",
            city: "Melbourne",
            country: "Australia",
            creditLimit: 117300.0,
            status: "active",
        },
        {
            customerNumber: 119,
            customerName: "La Rochelle Gifts",
            contactName: "Janine Labrune",
            phone: "+33 40.67.8555",
            city: "Nantes",
            country: "France",
            creditLimit: 118200.0,
            status: "pending",
        },
        {
            customerNumber: 121,
            customerName: "Baane Mini Imports",
            contactName: "Jonas Bergulfsen",
            phone: "+47 2212 1555",
            city: "Oslo",
            country: "Norway",
            creditLimit: 81700.0,
            status: "suspended",
        },
    ],
    metadata: {
        totalPages: 3,
        totalElements: 15,
        size: 5,
        number: 0,
    },
}

export function CustomersTable({
                                   customersPage = sampleCustomersPage,
                               }: { customersPage?: IPage<ICustomersTableHome> }) {
    const [customers, setCustomers] = useState(customersPage.content)

    const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false)
    useEffect(() => {
        setCustomers(customersPage.content)
    }, [customersPage.content])

    const { handleDelete } = useDelete(setCustomers)
    const { sortedItems, setSortDescriptor, sortDescriptor } = useSortedItems(customers)

    const renderCell = (uid: CellKey, item: ICustomersTableHome): JSX.Element => {
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

    const handleSort = (column: string) => {
        setSortDescriptor((prev) => ({
            column,
            direction: prev.column === column && prev.direction === "ascending" ? "descending" : "ascending",
        }))
    }

    return <React.Fragment>

        <NewCustomerModal open={isNewCustomerModalOpen} onOpenChange={setIsNewCustomerModalOpen} />
        <div className="space-y-4">
            <TableTopContent customersLength={customers.length} statusOptions={statusOptionsTableHome} setIsNewCustomerModalOpen={setIsNewCustomerModalOpen} />

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

            <TableBottomCustomers pages={customersPage.metadata?.totalPages || 1} />
        </div>
    </React.Fragment>
}

export default CustomersTable
