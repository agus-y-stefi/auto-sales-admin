"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/product";
import { StockBadge } from "./stock-badge";
import { formatCurrency } from "@/lib/format";
import { Eye } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "productCode",
        header: "CÓDIGO",
        cell: ({ row }) => (
            <Link
                href={`/products/${row.getValue("productCode")}`}
                className="font-mono text-xs text-blue-600 hover:underline dark:text-blue-400"
            >
                {row.getValue("productCode")}
            </Link>
        ),
    },
    {
        accessorKey: "productName",
        header: "PRODUCTO",
        cell: ({ row }) => (
            <div className="flex flex-col max-w-[280px]">
                <Link
                    href={`/products/${row.original.productCode}`}
                    className="font-medium truncate hover:underline"
                >
                    {row.getValue("productName")}
                </Link>
                <span className="text-xs text-muted-foreground mt-0.5">
                    {row.original.productVendor}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "productLine",
        header: "LÍNEA",
        cell: ({ row }) => (
            <span className="text-sm">{row.getValue("productLine")}</span>
        ),
    },
    {
        accessorKey: "productScale",
        header: "ESCALA",
        cell: ({ row }) => (
            <span className="font-mono text-xs text-muted-foreground">
                {row.getValue("productScale")}
            </span>
        ),
    },
    {
        accessorKey: "quantityInStock",
        header: () => <div className="text-right">STOCK</div>,
        cell: ({ row }) => (
            <div className="text-right">
                <StockBadge quantity={row.getValue("quantityInStock")} />
            </div>
        ),
    },
    {
        accessorKey: "buyPrice",
        header: () => <div className="text-right">PRECIO COMPRA</div>,
        cell: ({ row }) => (
            <div className="text-right tabular-nums text-sm">
                {formatCurrency(row.getValue("buyPrice"))}
            </div>
        ),
    },
    {
        accessorKey: "msrp",
        header: () => <div className="text-right">MSRP</div>,
        cell: ({ row }) => (
            <div className="text-right tabular-nums text-sm">
                {formatCurrency(row.getValue("msrp"))}
            </div>
        ),
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => (
            <Link
                href={`/products/${row.original.productCode}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
                <Eye className="h-3.5 w-3.5" />
                Ver
            </Link>
        ),
    },
];
