"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/types/customer";
import { StatusBadge } from "./status-badge";
import { formatCurrency, formatLocation, getInitials } from "@/lib/format";
import { getAvatarColor } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone } from "lucide-react";

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "customerNumber",
        header: "ID",
        cell: ({ row }) => (
            <span className="font-mono text-xs text-muted-foreground">
                #{row.getValue("customerNumber")}
            </span>
        ),
    },
    {
        accessorKey: "customerName",
        header: "COMPAÑÍA",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue("customerName")}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <Phone className="h-3 w-3" />
                    <span>{row.original.phone}</span>
                </div>
            </div>
        ),
    },
    {
        id: "contact",
        header: "CONTACTO",
        cell: ({ row }) => {
            const { contactFirstName, contactLastName } = row.original;
            const fullName = `${contactFirstName} ${contactLastName}`;
            const initials = getInitials(contactFirstName, contactLastName);
            const colorClass = getAvatarColor(fullName);

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className={`${colorClass} text-white text-xs font-medium`}>
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{fullName}</span>
                </div>
            );
        },
    },
    {
        id: "location",
        header: "UBICACIÓN",
        cell: ({ row }) => formatLocation(row.original.city, row.original.country),
    },
    {
        accessorKey: "creditLimit",
        header: () => (
            <div className="text-right">
                LÍMITE
                <br />
                CRÉDITO
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-right tabular-nums">
                {formatCurrency(row.getValue("creditLimit"))}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "ESTADO",
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
];
