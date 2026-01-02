"use client";

import React, { type JSX, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

import { TableTopContent } from "./table-top-customers";
import { formatCurrency } from "@/lib/format";
import type { IPage, ICustomersTableHome } from "@/contracts";
import {
    type CellKey,
    columnsCustomersTableHome,
    statusOptionsTableHome,
} from "@/lib/config/tables/customer-home.config";
import { NewCustomerModal } from "@/components/customers-home/new/new-customer-modal";
import { PaginationBottom } from "@/components/pagination_bottom";
import { useSortedItems } from "@/hooks/use_sort";
import Link from "next/link";

export function CustomersTable({
    customersPage,
}: {
    customersPage: IPage<ICustomersTableHome>;
}) {
    const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);

    const customers = customersPage.content;

    const { sortedItems, sortDescriptor, handleSort } =
        useSortedItems(customers);

    const renderCell = (
        uid: CellKey,
        item: ICustomersTableHome
    ): JSX.Element => {
        if (uid === "actions") {
            return (
                <React.Fragment>
                    <Link href={`/customers/${item.customerNumber}`}>
                        <Eye className="mr-2 h-4 w-4 text-primary hover:cursor-pointer" />
                    </Link>
                </React.Fragment>
            );
        }

        if (uid === "status") {
            const status = statusOptionsTableHome.find(
                (option) => option.uid === item.status
            );
            const getStatusVariant = (color: string) => {
                switch (color) {
                    case "success":
                        return "default";
                    case "danger":
                        return "destructive";
                    case "warning":
                        return "secondary";
                    default:
                        return "outline";
                }
            };

            return (
                <Badge variant={getStatusVariant(status?.color ?? "default")}>
                    {status?.name ?? item.status}
                </Badge>
            );
        }

        if (uid === "creditLimit") {
            return (
                <span className="text-muted-foreground font-medium">
                    {formatCurrency(item[uid])}
                </span>
            );
        }

        if (uid === "customerNumber") {
            return (
                <span className="text-muted-foreground font-medium">
                    {item[uid]}
                </span>
            );
        }

        return (
            <span className="text-foreground">
                {item[uid as keyof ICustomersTableHome] ?? ""}
            </span>
        );
    };

    return (
        <React.Fragment>
            <NewCustomerModal
                open={isNewCustomerModalOpen}
                onOpenChange={setIsNewCustomerModalOpen}
            />
            <div className="space-y-4">
                <TableTopContent
                    customersLength={customers.length}
                    setIsNewCustomerModalOpen={setIsNewCustomerModalOpen}
                />

                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columnsCustomersTableHome.map((column) => (
                                    <TableHead
                                        key={column.uid}
                                        className={`${
                                            column.uid === "actions"
                                                ? "text-center"
                                                : "text-left"
                                        } ${
                                            column.sortable
                                                ? "cursor-pointer hover:bg-muted/50"
                                                : ""
                                        }`}
                                        onClick={
                                            column.sortable
                                                ? () => handleSort(column.uid)
                                                : undefined
                                        }
                                    >
                                        <div className="flex items-center gap-2">
                                            {column.name}
                                            {column.sortable &&
                                                sortDescriptor.column ===
                                                    column.uid && (
                                                    <span className="text-xs">
                                                        {sortDescriptor.direction ===
                                                        "ascending"
                                                            ? "↑"
                                                            : "↓"}
                                                    </span>
                                                )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedItems.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={
                                            columnsCustomersTableHome.length
                                        }
                                        className="text-center py-8"
                                    >
                                        No se encontraron clientes
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sortedItems.map((item) => (
                                    <TableRow key={item.customerNumber}>
                                        {columnsCustomersTableHome.map(
                                            (column) => (
                                                <TableCell
                                                    key={column.uid}
                                                    className={
                                                        column.uid === "actions"
                                                            ? "text-center"
                                                            : ""
                                                    }
                                                >
                                                    {renderCell(
                                                        column.uid as CellKey,
                                                        item
                                                    )}
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <PaginationBottom
                    pages={customersPage.metadata.totalPages || 1}
                />
            </div>
        </React.Fragment>
    );
}

export default CustomersTable;
