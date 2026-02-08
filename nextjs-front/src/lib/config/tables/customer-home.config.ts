import { ITableColums } from "@/components/table-provider";

export const tableClassNames = {
    wrapper: ["max-h-[382px]", "max-w-3xl", "text-black"],
    th: [
        "bg-transparent",
        "text-default-500",
        "border-b",
        "border-divider",
        "text-default-700",
    ],
    td: [
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
    ],
};

export const columnsCustomersTableHome:ITableColums[] = [
    { name: "Nº Cliente", uid: "customerNumber", sortable: true },
    { name: "Nombre", uid: "customerName", sortable: true },
    { name: "Contacto", uid: "contactName", sortable: false },
    { name: "Teléfono", uid: "phone", sortable: true },
    { name: "Ciudad", uid: "city", sortable: true },
    { name: "País", uid: "country", sortable: true },
    { name: "Límite Crédito", uid: "creditLimit", sortable: true },
    { name: "Estado", uid: "status", sortable: true },
    { name: "Acciones", uid: "actions", sortable: false },
];

export const statusOptionsTableHome: Array<{
    name: string;
    uid: string;
    color:
        | "success"
        | "primary"
        | "warning"
        | "danger"
        | "default"
        | "secondary";
}> = [
    { name: "Activo", uid: "active", color: "success" },
    { name: "Inactivo", uid: "inactive", color: "default" },
    { name: "VIP", uid: "vip", color: "primary" },
    { name: "Moroso", uid: "overdue", color: "danger" },
    { name: "Nuevo", uid: "new", color: "secondary" },
    { name: "En revisión", uid: "review", color: "warning" },
];

export type StatusOption = (typeof statusOptionsTableHome)[number];

export const statusOptionsByName = new Map<string, StatusOption>(
    statusOptionsTableHome.map((option) => [option.name, option])
);
export const statusOptionsByUid = new Map<string, StatusOption>(
    statusOptionsTableHome.map((option) => [option.uid, option])
);

export type CellKey = (typeof columnsCustomersTableHome)[number]["uid"];