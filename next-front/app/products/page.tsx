"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import ProductsTable from "@/components/products-table"
import { NewProductModal } from "@/components/new-product-modal"

export default function ProductsPage() {
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsNewProductModalOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar productos..." className="pl-8" />
        </div>
      </div>

      <ProductsTable />

      <NewProductModal open={isNewProductModalOpen} onOpenChange={setIsNewProductModalOpen} />
    </div>
  )
}

