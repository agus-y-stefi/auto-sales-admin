"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/types/customer";
import { StatusBadge } from "./status-badge";
import { formatCurrency, formatLocation } from "@/lib/format";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function getAvatarColor(name: string): string {
    const colors = [
        "bg-blue-500",
        "bg-emerald-500",
        "bg-violet-500",
        "bg-rose-500",
        "bg-amber-500",
        "bg-cyan-500",
        "bg-pink-500",
        "bg-indigo-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "customerId",
        header: "ID",
        cell: ({ row }) => (
            <span className="font-mono text-xs text-muted-foreground">
                #{row.getValue("customerId")}
            </span>
        ),
    },
    {
        accessorKey: "companyName",
        header: "COMPAÑÍA",
        cell: ({ row }) => (
            <div>
                <div className="font-medium">{row.getValue("companyName")}</div>
                {row.original.companyType && (
                    <div className="text-xs text-muted-foreground">{row.original.companyType}</div>
                )}
            </div>
        ),
    },
    {
        id: "contact",
        header: "CONTACTO",
        cell: ({ row }) => {
            const { contactFirstName, contactLastName, contactRole } = row.original;
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
                    <div>
                        <div className="font-medium text-sm">{fullName}</div>
                        {contactRole && (
                            <div className="text-xs text-muted-foreground">{contactRole}</div>
                        )}
                    </div>
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
