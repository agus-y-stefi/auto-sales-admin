"use client";

import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { PaginationBottom } from "./pagination_bottom";
import { useHandleParams } from "@/hooks/use_handle_params";

interface TableHeaderSortableProps {
    columnUid: string
    columnName: string
    sortable?: boolean
    className?: string
}

function TableHeaderSortable({ columnUid, columnName, sortable, className }: TableHeaderSortableProps) {
    const { handleSort, sort, dir } = useHandleParams()
    
    if (!sortable) {
        return <TableHead className={className}>{columnName}</TableHead>
    }

    return (
        <TableHead
            className={`${className} cursor-pointer hover:bg-muted/50`}
            onClick={() => handleSort(columnUid)}
        >
            <div className="flex items-center gap-2">
                {columnName}
                {sort === columnUid && (
                    <span className="text-xs">
                        {dir === "asc" ? "↑" : "↓"}
                    </span>
                )}
            </div>
        </TableHead>
    )
}

export interface ITableColums {
    name: string;
    uid: string;
    sortable: boolean;
}

export interface ITableProviderProps {
    children: React.ReactNode;
    columns: ITableColums[];
    pages: number;
}

export function TableProvider({
    children,
    columns,
    pages,
}: ITableProviderProps) {

    return (
        <React.Fragment>

                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableHeaderSortable
                                        key={column.uid}
                                        columnUid={column.uid}
                                        columnName={column.name}
                                        sortable={column.sortable}
                                    />
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>{children}</TableBody>
                    </Table>
                </div>

                <PaginationBottom pages={pages} />
        </React.Fragment>
    );
}


