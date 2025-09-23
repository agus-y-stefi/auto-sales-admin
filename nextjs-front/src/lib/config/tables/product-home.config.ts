import type { IProductTableHome } from "@/contracts"

export interface IProductTableHomeConfig {
    key: keyof IProductTableHome
    label: string
    sortable?: boolean
    className?: string
}

export const productTableHomeConfig: IProductTableHomeConfig[] = [
    {
        key: "productCode",
        label: "Código",
        sortable: true,
        className: "w-[120px]",
    },
    {
        key: "productName",
        label: "Nombre",
        sortable: true,
    },
    {
        key: "productLine",
        label: "Línea",
        sortable: true,
    },
    {
        key: "productVendor",
        label: "Proveedor",
        sortable: true,
    },
    {
        key: "status",
        label: "Estado",
        sortable: true,
    },
    {
        key: "buyPrice",
        label: "Precio Compra",
        sortable: true,
        className: "text-right",
    },
    {
        key: "MSRP",
        label: "Precio Venta",
        sortable: true,
        className: "text-right",
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
