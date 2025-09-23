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
const customers = [
    { id: "103", name: "Mini Gifts Distributors Ltd." },
    { id: "112", name: "Signal Gift Stores" },
    { id: "114", name: "Australian Collectors, Co." },
    { id: "119", name: "La Rochelle Gifts" },
    { id: "121", name: "Baane Mini Imports" },
]

export function NewOrderModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí iría la lógica para guardar la orden
        const formData = new FormData(e.target as HTMLFormElement)
        const orderData = Object.fromEntries(formData)
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
                            <Label htmlFor="customerNumber">Cliente</Label>
                            <Select name="customerNumber" required>
                                <SelectTrigger id="customerNumber">
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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="orderDate">Fecha de Orden</Label>
                                <Input
                                    id="orderDate"
                                    name="orderDate"
                                    type="date"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="requiredDate">Fecha Requerida</Label>
                                <Input id="requiredDate" name="requiredDate" type="date" required />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Estado</Label>
                            <Select name="status" defaultValue="pending" required>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pendiente</SelectItem>
                                    <SelectItem value="processing">Procesando</SelectItem>
                                    <SelectItem value="shipped">Enviado</SelectItem>
                                    <SelectItem value="cancelled">Cancelado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="comments">Comentarios</Label>
                            <Textarea
                                id="comments"
                                name="comments"
                                placeholder="Comentarios adicionales sobre la orden..."
                                rows={3}
                            />
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
