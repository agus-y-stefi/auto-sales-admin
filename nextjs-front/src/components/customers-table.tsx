"use client"

import React, {JSX, useState} from "react"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
} from "@heroui/react"
import type {SortDescriptor} from "@heroui/react"
import {TableTopContent} from "./table-top-content-customers"
import {TableBottomContent} from "./table-bottom-content"
import {VerticalDotsIcon} from "./icons/index"
import {Page} from "@/app/lib/definitions";
import {tableClassNames} from "@/app/styles/tableStyles";

export interface FormattedCustomerTableHome {
    customerNumber: number;
    customerName: string;
    contactName: string;
    phone: string;
    city: string;
    country: string;
    creditLimit: number;
    status: string;
}

export const columns = [
    {name: "Nº Cliente", uid: "customerNumber", sortable: true},
    {name: "Nombre", uid: "customerName", sortable: true},
    {name: "Contacto", uid: "contactName", sortable: true},
    {name: "Teléfono", uid: "phone", sortable: true},
    {name: "Ciudad", uid: "city", sortable: true},
    {name: "País", uid: "country", sortable: true},
    {name: "Límite Crédito", uid: "creditLimit", sortable: true},
    {name: "Estado", uid: "status", sortable: true},
    {name: "Acciones", uid: "actions"},
]

export const statusOptions: Array<{
    name: string,
    uid: string,
    color: "success" | "primary" | "warning" | "danger" | "default" | "secondary"
}> = [
    {name: "Activo", uid: "active", color: "success"},
    {name: "Inactivo", uid: "inactive", color: "default"},
    {name: "VIP", uid: "vip", color: "primary"},
    {name: "Moroso", uid: "overdue", color: "danger"},
    {name: "Nuevo", uid: "new", color: "secondary"},
    {name: "En revisión", uid: "review", color: "warning"}
]

type CellKey = (typeof columns[number])["uid"];

const renderCell = (uid: CellKey, item: FormattedCustomerTableHome): JSX.Element => {
    if (uid === "actions") {
        return (
            <div className="relative flex justify-end items-center gap-2">
                <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger>
                        <Button isIconOnly radius="full" size="sm" variant="light">
                            <VerticalDotsIcon className="text-default-400"/>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="edit">Editar</DropdownItem>
                        <DropdownItem key="delete">Eliminar</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }

    if (uid === "status") {
        const status = statusOptions.find(option => option.name === item.status);
        return (
            <Chip
                className="capitalize border-none gap-1 text-default-600"
                color={status?.color ?? "default"}
                size="sm"
                variant="flat"
            >
                {item.status}
            </Chip>
        );
    }

    if (uid === "creditLimit") {
        return <span className="text-default-500">{formatCurrency(item[uid])}</span>;
    }

    if (uid === "customerNumber") {
        return <span className="text-default-500 font-medium">{item[uid]}</span>;
    }

    return <span className="text-default-700">{item[uid as keyof FormattedCustomerTableHome] ?? ""}</span>;
};

// Función para formatear moneda
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
};

export function CustomersTable({customersPage}: { customersPage: Page<FormattedCustomerTableHome>}) {
    const customers = customersPage.content;

    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "customerName",
        direction: "ascending",
    })

    const sortedItems = React.useMemo(() => {
        return [...customers].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof FormattedCustomerTableHome]
            const second = b[sortDescriptor.column as keyof FormattedCustomerTableHome]
            const cmp = first < second ? -1 : first > second ? 1 : 0

            return sortDescriptor.direction === "descending" ? -cmp : cmp
        })
    }, [sortDescriptor, customers])


    return (
        <Table
            isCompact
            removeWrapper
            aria-label="Tabla de clientes con celdas personalizadas, paginación y ordenamiento"
            bottomContent={
                <TableBottomContent
                    pages={customersPage.totalPages}
                />
            }
            bottomContentPlacement="outside"
            checkboxesProps={{
                classNames: {
                    wrapper: "after:bg-foreground after:text-background text-background",
                },
            }}
            classNames={tableClassNames}
            selectionMode="none"
            sortDescriptor={sortDescriptor}
            topContent={
                <TableTopContent
                    customersLength={customers.length}
                    statusOptions={statusOptions}
                />
            }
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No se encontraron clientes"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.customerNumber}>{(columnKey) =>
                        <TableCell>{renderCell(columnKey as string, item)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}