"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, CreditCard } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Datos de ejemplo
const customers = [
  {
    customerNumber: "103",
    customerName: "Mini Gifts Distributors Ltd.",
    contactName: "Susan Nelson",
    phone: "+1 415-555-1450",
    city: "San Rafael",
    country: "USA",
    creditLimit: 210500.0,
    salesRep: "Leslie Jennings",
  },
  {
    customerNumber: "112",
    customerName: "Signal Gift Stores",
    contactName: "Jean King",
    phone: "+1 714-555-2611",
    city: "Las Vegas",
    country: "USA",
    creditLimit: 71800.0,
    salesRep: "Leslie Jennings",
  },
  {
    customerNumber: "114",
    customerName: "Australian Collectors, Co.",
    contactName: "Peter Ferguson",
    phone: "+61 3 9520 4555",
    city: "Melbourne",
    country: "Australia",
    creditLimit: 117300.0,
    salesRep: "Peter Marsh",
  },
  {
    customerNumber: "119",
    customerName: "La Rochelle Gifts",
    contactName: "Janine Labrune",
    phone: "+33 40.67.8555",
    city: "Nantes",
    country: "France",
    creditLimit: 118200.0,
    salesRep: "Sophie Bourlet",
  },
  {
    customerNumber: "121",
    customerName: "Baane Mini Imports",
    contactName: "Jonas Bergulfsen",
    phone: "+47 2212 1555",
    city: "Oslo",
    country: "Norway",
    creditLimit: 81700.0,
    salesRep: "Bjorn Hansen",
  },
]

export default function CustomersTable() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const getCreditLimitColor = (limit: number) => {
    if (limit > 150000) return "bg-green-100 text-green-800 hover:bg-green-100/80"
    if (limit > 100000) return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
    if (limit > 50000) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80"
    return "bg-red-100 text-red-800 hover:bg-red-100/80"
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Representante</TableHead>
            <TableHead className="text-right">Límite de Crédito</TableHead>
            <TableHead className="w-[80px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.customerNumber}>
              <TableCell className="font-medium">{customer.customerNumber}</TableCell>
              <TableCell>{customer.customerName}</TableCell>
              <TableCell>{customer.contactName}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>
                {customer.city}, {customer.country}
              </TableCell>
              <TableCell>{customer.salesRep}</TableCell>
              <TableCell className="text-right">
                <Badge variant="outline" className={getCreditLimitColor(customer.creditLimit)}>
                  {formatCurrency(customer.creditLimit)}
                </Badge>
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
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Ver pagos</span>
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

