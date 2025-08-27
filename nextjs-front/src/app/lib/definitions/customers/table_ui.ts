
export const columnsCustomersTableHome = [
    {name: "Nº Cliente", uid: "customerNumber", sortable: true},
    {name: "Nombre", uid: "customerName", sortable: true},
    {name: "Contacto", uid: "contactName", sortable: true},
    {name: "Teléfono", uid: "phone", sortable: true},
    {name: "Ciudad", uid: "city", sortable: true},
    {name: "País", uid: "country", sortable: true},
    {name: "Límite Crédito", uid: "creditLimit", sortable: true},
    {name: "Estado", uid: "status", sortable: true},
    {name: "Acciones", uid: "actions"},
]

export const statusOptionsTableHome: Array<{
    name: string,
    uid: string,
    color: "success" | "primary" | "warning" | "danger" | "default" | "secondary"
}> = [
    {name: "Activo", uid: "active", color: "success"},
    {name: "Inactivo", uid: "inactive", color: "default"},
    {name: "VIP", uid: "vip", color: "primary"},
    {name: "Moroso", uid: "overdue", color: "danger"},
    {name: "Nuevo", uid: "new", color: "secondary"},
    {name: "En revisión", uid: "review", color: "warning"}
]

export type CellKey = (typeof columnsCustomersTableHome[number])["uid"];