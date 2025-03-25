"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Datos de ejemplo
const orders = [
  {
    orderNumber: "10426",
    orderDate: "2023-05-15",
    customerName: "Mini Gifts Distributors Ltd.",
    status: "Enviado",
    itemCount: 5,
    totalPrice: 10835.24,
  },
  {
    orderNumber: "10425",
    orderDate: "2023-05-14",
    customerName: "La Rochelle Gifts",
    status: "En proceso",
    itemCount: 3,
    totalPrice: 1538.45,
  },
  {
    orderNumber: "10424",
    orderDate: "2023-05-13",
    customerName: "Euro+ Shopping Channel",
    status: "Pendiente",
    itemCount: 8,
    totalPrice: 5489.99,
  },
  {
    orderNumber: "10423",
    orderDate: "2023-05-12",
    customerName: "Australian Collectors, Co.",
    status: "Enviado",
    itemCount: 4,
    totalPrice: 2384.3,
  },
  {
    orderNumber: "10422",
    orderDate: "2023-05-11",
    customerName: "Diecast Classics Inc.",
    status: "Cancelado",
    itemCount: 2,
    totalPrice: 945.0,
  },
]

export default function OrdersTable() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Enviado":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "En proceso":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80"
      case "Cancelado":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  const viewOrderDetails = (orderNumber: string) => {
    router.push(`/orders/${orderNumber}`)
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nº Orden</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Nº Artículos</TableHead>
            <TableHead className="text-right">Precio Total</TableHead>
            <TableHead className="w-[80px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderNumber}>
              <TableCell className="font-medium">{order.orderNumber}</TableCell>
              <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{order.itemCount}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "EUR",
                }).format(order.totalPrice)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => viewOrderDetails(order.orderNumber)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Ver detalles</span>
                    </DropdownMenuItem>
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

