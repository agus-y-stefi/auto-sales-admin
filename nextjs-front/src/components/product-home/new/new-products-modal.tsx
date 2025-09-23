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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createProduct, type ICreateProduct } from "@/contracts"
import { transformFormDataToObject } from "@/lib/form_data_transform"

// Datos de ejemplo
const productLines = [
    { id: "vintage-cars", name: "Vintage Cars" },
    { id: "classic-cars", name: "Classic Cars" },
    { id: "motorcycles", name: "Motorcycles" },
    { id: "planes", name: "Planes" },
    { id: "ships", name: "Ships" },
    { id: "trucks-buses", name: "Trucks and Buses" },
]

const vendors = [
    { id: "welly", name: "Welly Diecast Productions" },
    { id: "classic-metal", name: "Classic Metal Creations" },
    { id: "exoto", name: "Exoto Designs" },
    { id: "motor-city", name: "Motor City Art Classics" },
    { id: "min-lin", name: "Min Lin Diecast" },
    { id: "studio-m", name: "Studio M Art Models" },
]

interface NewProductModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function NewProductModal({ open, onOpenChange, onSuccess }: NewProductModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const formData = new FormData(e.target as HTMLFormElement)
            const productData = transformFormDataToObject(formData) as ICreateProduct

            // Convert numeric fields
            productData.quantityInStock = Number(productData.quantityInStock)
            productData.buyPrice = Number(productData.buyPrice)
            productData.msrp = Number(productData.msrp)

            await createProduct(productData)

            toast({
                title: "Producto creado",
                description: `El producto ${productData.productName} ha sido creado exitosamente.`,
            })

            onOpenChange(false)
            onSuccess?.()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Error al crear el producto",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
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
                                            <SelectItem key={line.id} value={line.name}>
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
                                required
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
                                            <SelectItem key={vendor.id} value={vendor.name}>
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
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Guardando..." : "Guardar Producto"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
