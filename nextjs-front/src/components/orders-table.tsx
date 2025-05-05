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
import {TableTopContent} from "./table-top-content"
import {TableBottomContent} from "./table-bottom-content"
import {VerticalDotsIcon} from "./icons/index"
import {FormattedOrderTableHome, Page} from "@/app/lib/definitions";
import {tableClassNames} from "@/app/styles/tableStyles";


export const columns = [
    {name: "N° de orden", uid: "orderNumber", sortable: true},
    {name: "Fecha", uid: "orderDate", sortable: true},
    {name: "Cliente", uid: "customerName", sortable: true},
    {name: "Precio total", uid: "total", sortable: true},
    {name: "Estado", uid: "status", sortable: true},
    {name: "Acciones", uid: "actions"},
]

export const statusOptions: Array<{
    name: string,
    uid: string,
    color: "success" | "primary" | "warning" | "danger" | "default" | "secondary"
}> = [
    {name: "Enviado", uid: "sent", color: "success"},
    {name: "En proceso", uid: "inProgress", color: "primary"},
    {name: "Pendiente", uid: "pending", color: "warning"},
    {name: "Entregado", uid: "delivered", color: "success"},
    {name: "Cancelado", uid: "canceled", color: "danger"},
    {name: "Devuelto", uid: "returned", color: "default"},
    {name: "Reembolsado", uid: "refunded", color: "secondary"}
]

type CellKey = (typeof columns[number])["uid"];

const renderCell = (uid: CellKey, item: FormattedOrderTableHome): JSX.Element => {
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
                        <DropdownItem key="view">Ver Detalles</DropdownItem>
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

    return <span className="text-default-500">{item[uid as keyof FormattedOrderTableHome] ?? ""}</span>;
};

export function OrdersTable({ordersPage}: { ordersPage: Page<FormattedOrderTableHome>}) {
    const orders = ordersPage.content;

    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "customerName",
        direction: "ascending",
    })

    const sortedItems = React.useMemo(() => {
        return [...orders].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof FormattedOrderTableHome]
            const second = b[sortDescriptor.column as keyof FormattedOrderTableHome]
            const cmp = first < second ? -1 : first > second ? 1 : 0

            return sortDescriptor.direction === "descending" ? -cmp : cmp
        })
    }, [sortDescriptor, orders])


    return (
        <Table
            isCompact
            removeWrapper
            aria-label="User management table with custom cells, pagination and sorting"
            bottomContent={
                <TableBottomContent
                    pages={ordersPage.totalPages}
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
                    ordersLength={orders.length}
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
            <TableBody emptyContent={"No clients found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.orderNumber}>{(columnKey) =>
                        <TableCell>{renderCell(columnKey as string, item)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
