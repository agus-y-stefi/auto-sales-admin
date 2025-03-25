"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Datos de ejemplo
const products = [
  {
    productCode: "S18_1749",
    productName: "1917 Grand Touring Sedan",
    productLine: "Vintage Cars",
    productScale: "1:18",
    productVendor: "Welly Diecast Productions",
    quantityInStock: 86,
    buyPrice: 68.0,
    MSRP: 86.7,
  },
  {
    productCode: "S18_2248",
    productName: "1911 Ford Town Car",
    productLine: "Vintage Cars",
    productScale: "1:18",
    productVendor: "Motor City Art Classics",
    quantityInStock: 540,
    buyPrice: 33.3,
    MSRP: 46.91,
  },
  {
    productCode: "S18_4409",
    productName: "1932 Alfa Romeo 8C2300 Spider Tour",
    productLine: "Vintage Cars",
    productScale: "1:18",
    productVendor: "Exoto Designs",
    quantityInStock: 6553,
    buyPrice: 43.26,
    MSRP: 92.03,
  },
  {
    productCode: "S24_3969",
    productName: "1936 Mercedes Benz 500k Roadster",
    productLine: "Vintage Cars",
    productScale: "1:24",
    productVendor: "Red Start Diecast",
    quantityInStock: 2081,
    buyPrice: 21.75,
    MSRP: 41.03,
  },
  {
    productCode: "S24_4258",
    productName: "1936 Chrysler Airflow",
    productLine: "Vintage Cars",
    productScale: "1:24",
    productVendor: "Second Gear Diecast",
    quantityInStock: 4710,
    buyPrice: 57.46,
    MSRP: 97.39,
  },
]

export default function ProductsTable() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const getStockStatusColor = (quantity: number) => {
    if (quantity > 1000) return "bg-green-100 text-green-800 hover:bg-green-100/80"
    if (quantity > 100) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80"
    return "bg-red-100 text-red-800 hover:bg-red-100/80"
  }

  const getStockStatus = (quantity: number) => {
    if (quantity > 1000) return "En stock"
    if (quantity > 100) return "Stock bajo"
    return "Crítico"
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Código</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Línea</TableHead>
            <TableHead>Proveedor</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Precio Compra</TableHead>
            <TableHead className="text-right">Precio Venta</TableHead>
            <TableHead className="w-[80px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.productCode}>
              <TableCell className="font-medium">{product.productCode}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.productLine}</TableCell>
              <TableCell>{product.productVendor}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStockStatusColor(product.quantityInStock)}>
                  {getStockStatus(product.quantityInStock)} ({product.quantityInStock})
                </Badge>
              </TableCell>
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
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4 border-t">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

