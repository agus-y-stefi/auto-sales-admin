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
import {tableClassNames} from "@/app/styles/tableStyles";
import {formatCurrency} from "@/app/lib/utils/format";
import {CellKey, columnsCustomersTableHome, statusOptionsTableHome} from "@/app/lib/definitions/customers/table_ui";
import {IPage, ICustomersTableHome} from "@/contracts";


const renderCell = (uid: CellKey, item: ICustomersTableHome): JSX.Element => {
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
        const status = statusOptionsTableHome.find(option => option.name === item.status);
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

    return <span className="text-default-700">{item[uid as keyof ICustomersTableHome] ?? ""}</span>;
};

export function CustomersTable({customersPage}: { customersPage: IPage<ICustomersTableHome>}) {
    const customers = customersPage.content;

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

    return (
        <Table
            isCompact
            removeWrapper
            aria-label="Tabla de clientes con celdas personalizadas, paginación y ordenamiento"
            bottomContent={
                <TableBottomContent
                    pages={customersPage.metadata?.totalPages || 1 }
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
                    statusOptions={statusOptionsTableHome}
                />
            }
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={columnsCustomersTableHome}>
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