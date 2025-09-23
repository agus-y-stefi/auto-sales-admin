import type { IOrderTableHome } from "@/contracts"

export type OrderCellKey = keyof IOrderTableHome | "actions"

export const columnsOrdersTableHome = [
    { name: "NÚMERO", uid: "orderNumber", sortable: true },
    { name: "FECHA", uid: "orderDate", sortable: true },
    { name: "CLIENTE", uid: "customerName", sortable: true },
    { name: "TOTAL", uid: "total", sortable: true },
    { name: "ESTADO", uid: "status", sortable: true },
    { name: "ACCIONES", uid: "actions", sortable: false },
]

export const statusOptionsOrdersTableHome = [
    { name: "Enviado", uid: "shipped", color: "success" as const },
    { name: "Procesando", uid: "processing", color: "warning" as const },
    { name: "Pendiente", uid: "pending", color: "secondary" as const },
    { name: "Cancelado", uid: "cancelled", color: "danger" as const },
]
