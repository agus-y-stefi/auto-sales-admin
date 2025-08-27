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
import {TableTopContent} from "./table-top-content-products"
import {TableBottomContent} from "./table-bottom-content"
import {VerticalDotsIcon} from "./icons/index"
import {Page} from "@/app/lib/definitions/definitions";
import {tableClassNames} from "@/app/styles/tableStyles";
import {IPage} from "@/contracts";
import {IProductTableHome} from "@/contracts/product-service/types/products.type";

export interface FormattedProductTableHome {
    productCode: string;
    productName: string;
    productLine: string;
    productVendor: string;
    quantityInStock: number;
    buyPrice: number;
    MSRP: number;
    status: string;
}

export const columns = [
    {name: "Código", uid: "productCode", sortable: true},
    {name: "Nombre", uid: "productName", sortable: true},
    {name: "Línea", uid: "productLine", sortable: true},
    {name: "Proveedor", uid: "productVendor", sortable: true},
    {name: "Stock", uid: "quantityInStock", sortable: true},
    {name: "Precio Compra", uid: "buyPrice", sortable: true},
    {name: "MSRP", uid: "MSRP", sortable: true},
    {name: "Estado", uid: "status", sortable: true},
    {name: "Acciones", uid: "actions"},
]

export const statusOptions: Array<{
    name: string,
    uid: string,
    color: "success" | "primary" | "warning" | "danger" | "default" | "secondary"
}> = [
    {name: "En stock", uid: "inStock", color: "success"},
    {name: "Stock bajo", uid: "lowStock", color: "warning"},
    {name: "Sin stock", uid: "outOfStock", color: "danger"},
    {name: "Descontinuado", uid: "discontinued", color: "default"},
    {name: "Nuevo", uid: "new", color: "primary"},
    {name: "En oferta", uid: "onSale", color: "secondary"}
]

type CellKey = (typeof columns[number])["uid"];

const renderCell = (uid: CellKey, item: FormattedProductTableHome): JSX.Element => {
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

    if (uid === "buyPrice" || uid === "MSRP") {
        return <span className="text-default-500">{formatCurrency(item[uid])}</span>;
    }

    if (uid === "quantityInStock") {
        return <span className="text-default-500">{item[uid].toLocaleString()}</span>;
    }

    return <span className="text-default-700">{item[uid as keyof FormattedProductTableHome] ?? ""}</span>;
};

// Función para formatear moneda
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
};

export function ProductsTable({productsPage}: { productsPage: IPage<IProductTableHome>}) {
    const products = productsPage.content;

    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "productName",
        direction: "ascending",
    })

    const sortedItems = React.useMemo(() => {
        return [...products].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof FormattedProductTableHome]
            const second = b[sortDescriptor.column as keyof FormattedProductTableHome]
            const cmp = first < second ? -1 : first > second ? 1 : 0

            return sortDescriptor.direction === "descending" ? -cmp : cmp
        })
    }, [sortDescriptor, products])


    return (
        <Table
            isCompact
            removeWrapper
            aria-label="Tabla de productos con celdas personalizadas, paginación y ordenamiento"
            bottomContent={
                <TableBottomContent
                    pages={productsPage.metadata?.totalPages || 1}
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
                    productsLength={products.length}
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
            <TableBody emptyContent={"No se encontraron productos"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.productCode}>{(columnKey) =>
                        <TableCell>{renderCell(columnKey as string, item)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}