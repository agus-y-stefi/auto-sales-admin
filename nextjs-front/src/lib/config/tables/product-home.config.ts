import { ITableColums } from "@/components/table-provider"

export const columnsProductsTableHome: ITableColums[] = [
    {

        uid: "productCode",
        name: "Código",
        sortable: true,
    },
    {
        uid: "productName",
        name: "Nombre",
        sortable: true,
    },
    {
        uid: "productLine",
        name: "Línea",
        sortable: true,
    },
    {
        uid: "productVendor",
        name: "Proveedor",
        sortable: true,
    },
    {
        uid: "status",
        name: "Estado",
        sortable: true,
    },
    {
        
        uid: "buyPrice",
        name: "Precio Compra",
        sortable: true,
    },
    {
        uid: "MSRP",
        name: "Precio Venta",
        sortable: true,
    },
]

export const productStatusOptions = [
    { value: "in_stock", label: "En Stock", color: "bg-green-100 text-green-800 hover:bg-green-100/80" },
    { value: "low", label: "Stock Bajo", color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80" },
    { value: "critical", label: "Crítico", color: "bg-red-100 text-red-800 hover:bg-red-100/80" },
]

export const getProductStatusConfig = (status: string) => {
    return productStatusOptions.find((option) => option.value === status) || productStatusOptions[0]
}
