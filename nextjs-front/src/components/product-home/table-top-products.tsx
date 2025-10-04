"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search } from "lucide-react"
import { productStatusOptions } from "@/lib/config/tables/product-home.config"

interface TableTopProductsProps {
    onNewProduct: () => void
    searchQuery: string
    onSearchChange: (query: string) => void
    statusFilter: string
    onStatusFilterChange: (status: string) => void
}

export default function TableTopProducts({
                                             onNewProduct,
                                             searchQuery,
                                             onSearchChange,
                                             statusFilter,
                                             onStatusFilterChange,
                                         }: TableTopProductsProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar productos..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        {productStatusOptions.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                                {status.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button className="flex items-center gap-2" onClick={onNewProduct}>
                <PlusCircle className="h-4 w-4" />
                Nuevo Producto
            </Button>
        </div>
    )
}
