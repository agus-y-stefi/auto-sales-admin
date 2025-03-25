"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Datos de ejemplo
const productLines = [
  { id: "vintage-cars", name: "Vintage Cars" },
  { id: "classic-cars", name: "Classic Cars" },
  { id: "motorcycles", name: "Motorcycles" },
  { id: "planes", name: "Planes" },
  { id: "ships", name: "Ships" },
]

const vendors = [
  { id: "welly", name: "Welly Diecast Productions" },
  { id: "classic-metal", name: "Classic Metal Creations" },
  { id: "exoto", name: "Exoto Designs" },
  { id: "motor-city", name: "Motor City Art Classics" },
]

export function NewProductModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el producto
    const formData = new FormData(e.target as HTMLFormElement)
    const productData = Object.fromEntries(formData)
    console.log(productData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nuevo Producto</DialogTitle>
            <DialogDescription>Añade un nuevo producto al catálogo.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="productCode">Código de Producto</Label>
                <Input id="productCode" name="productCode" placeholder="Ej: S18_1234" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="productLine">Línea de Producto</Label>
                <Select name="productLine" required>
                  <SelectTrigger id="productLine">
                    <SelectValue placeholder="Seleccionar línea" />
                  </SelectTrigger>
                  <SelectContent>
                    {productLines.map((line) => (
                      <SelectItem key={line.id} value={line.id}>
                        {line.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="productName">Nombre del Producto</Label>
              <Input id="productName" name="productName" placeholder="Nombre completo del producto" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="productDescription">Descripción</Label>
              <Textarea
                id="productDescription"
                name="productDescription"
                placeholder="Descripción detallada del producto"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="productScale">Escala</Label>
                <Input id="productScale" name="productScale" placeholder="Ej: 1:18" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="productVendor">Proveedor</Label>
                <Select name="productVendor" required>
                  <SelectTrigger id="productVendor">
                    <SelectValue placeholder="Seleccionar proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantityInStock">Cantidad en Stock</Label>
                <Input id="quantityInStock" name="quantityInStock" type="number" min="0" placeholder="0" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="buyPrice">Precio de Compra</Label>
                <Input id="buyPrice" name="buyPrice" type="number" min="0" step="0.01" placeholder="0.00" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="msrp">Precio de Venta (MSRP)</Label>
                <Input id="msrp" name="msrp" type="number" min="0" step="0.01" placeholder="0.00" required />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Producto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

