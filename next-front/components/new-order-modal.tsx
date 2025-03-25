"use client"

import type React from "react"

import { useState } from "react"
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

// Datos de ejemplo
const customers = [
  { id: "103", name: "Mini Gifts Distributors Ltd." },
  { id: "112", name: "Signal Gift Stores" },
  { id: "114", name: "Australian Collectors, Co." },
  { id: "119", name: "La Rochelle Gifts" },
]

const products = [
  { id: "S18_1749", name: "1917 Grand Touring Sedan", price: 86.7 },
  { id: "S18_2248", name: "1911 Ford Town Car", price: 33.3 },
  { id: "S18_4409", name: "1932 Alfa Romeo 8C2300 Spider Tour", price: 43.26 },
]

export function NewOrderModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [orderItems, setOrderItems] = useState([{ productId: "", quantity: 1 }])

  const handleAddItem = () => {
    setOrderItems([...orderItems, { productId: "", quantity: 1 }])
  }

  const handleRemoveItem = (index: number) => {
    const newItems = [...orderItems]
    newItems.splice(index, 1)
    setOrderItems(newItems)
  }

  const handleProductChange = (index: number, productId: string) => {
    const newItems = [...orderItems]
    newItems[index].productId = productId
    setOrderItems(newItems)
  }

  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...orderItems]
    newItems[index].quantity = quantity
    setOrderItems(newItems)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar la orden
    console.log({
      customerId: selectedCustomer,
      items: orderItems,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nueva Orden</DialogTitle>
            <DialogDescription>Crea una nueva orden de venta.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="customer">Cliente</Label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer} required>
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Productos</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                  Añadir producto
                </Button>
              </div>

              {orderItems.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr,100px,auto] gap-2 items-end">
                  <Select value={item.productId} onValueChange={(value) => handleProductChange(index, value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, Number.parseInt(e.target.value))}
                    required
                  />
                  {orderItems.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveItem(index)}>
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="comments">Comentarios</Label>
              <Input id="comments" placeholder="Comentarios adicionales" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Orden</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

