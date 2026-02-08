import type { IOrderTableHome } from "@/contracts"

export type OrderCellKey = keyof IOrderTableHome | "actions"

export const columnsOrdersTableHome = [
    { name: "NÚMERO", uid: "orderNumber", sortable: true },
    { name: "FECHA", uid: "orderDate", sortable: true },
    { name: "CLIENTE", uid: "customerName", sortable: false},
    { name: "TOTAL", uid: "total", sortable: true },
    { name: "ESTADO", uid: "status", sortable: true },
    { name: "ACCIONES", uid: "actions", sortable: false },
]

export const statusOptionsOrdersTableHome = [
    { name: "Enviado", uid: "Shipped",   color: "success" },
    { name: "Procesando", uid: "Disputed", color: "warning" },
    { name: "Pendiente", uid: "On Hold", color: "secondary" },
    { name: "Resuelto", uid: "Resolved", color: "default" },
    { name: "Cancelado", uid: "Cancelled", color: "destructive" },
]
