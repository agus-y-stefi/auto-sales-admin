"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, ArrowUpDown } from "lucide-react"
import {IPage, type IProductTableHome, type SortDescriptor} from "@/contracts"
import { productTableHomeConfig, getProductStatusConfig } from "@/lib/config/tables/product-home.config"
import { formatCurrency } from "@/lib/format"
import {PaginationBottom} from "@/components/pagination_bottom";

interface ProductsTableProps {
    products: IPage<IProductTableHome>
    sortDescriptor?: SortDescriptor
}

export default function ProductsTable({ products, sortDescriptor }: ProductsTableProps) {
    const [deletingProduct, setDeletingProduct] = useState<string | null>(null)

    const handleSort = (column: string) => {
        /*if (!onSortChange) return

        const direction =
            sortDescriptor?.column === column && sortDescriptor.direction === "ascending" ? "descending" : "ascending"

        onSortChange({ column, direction })*/
    }

    const handleDelete = async (productCode: string) => {
        setDeletingProduct(productCode)
        try {
            /*await deleteProduct(productCode)
            toast({
                title: "Producto eliminado",
                description: `El producto ${productCode} ha sido eliminado exitosamente.`,
            })
            onRefresh?.()*/
        } catch (error) {
            /*toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Error al eliminar el producto",
                variant: "destructive",
            })*/
        } finally {
            setDeletingProduct(null)
        }
    }

    const getSortIcon = (column: string) => {
        if (sortDescriptor?.column !== column) {
            return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        }
        return <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDescriptor.direction === "ascending" ? "rotate-180" : ""}`} />
    }

    const getStockDisplay = (product: IProductTableHome) => {
        const statusConfig = getProductStatusConfig(product.status)
        return (
            <Badge variant="outline" className={statusConfig.color}>
                {statusConfig.label} ({product.quantityInStock})
            </Badge>
        )
    }

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        {productTableHomeConfig.map((config) => (
                            <TableHead key={config.key} className={config.className}>
                                {config.sortable ? (
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleSort(config.key)}
                                        className="h-auto p-0 font-medium hover:bg-transparent"
                                    >
                                        {config.label}
                                        {getSortIcon(config.key)}
                                    </Button>
                                ) : (
                                    config.label
                                )}
                            </TableHead>
                        ))}
                        <TableHead className="w-[80px]">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.content.map((product) => (
                        <TableRow key={product.productCode}>
                            <TableCell className="font-medium">{product.productCode}</TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.productLine}</TableCell>
                            <TableCell>{product.productVendor}</TableCell>
                            <TableCell>{getStockDisplay(product)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(product.buyPrice)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(product.MSRP)}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Abrir menú</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Edit className="mr-2 h-4 w-4" />
                                            <span>Editar</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={() => handleDelete(product.productCode)}
                                            disabled={deletingProduct === product.productCode}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>{deletingProduct === product.productCode ? "Eliminando..." : "Eliminar"}</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationBottom pages={products.metadata.totalPages || 0} />
        </div>
    )
}
