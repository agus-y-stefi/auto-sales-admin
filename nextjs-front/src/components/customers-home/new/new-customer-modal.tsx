"use client"

import type React from "react"

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {customerCreateFormDataTransform} from "@/lib/form_data_transform";
import {createCustomers} from "@/contracts";

// Datos de ejemplo
const salesReps = [
    {id: "1165", name: "Leslie Jennings"},
    {id: "1166", name: "Peter Marsh"},
    {id: "1188", name: "Sophie Bourlet"},
    {id: "1216", name: "Bjorn Hansen"},
]

const countries = [
    {code: "USA", name: "Estados Unidos"},
    {code: "ESP", name: "España"},
    {code: "FRA", name: "Francia"},
    {code: "GER", name: "Alemania"},
    {code: "UK", name: "Reino Unido"},
    {code: "AUS", name: "Australia"},
]

export function NewCustomerModal({open, onOpenChange}: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí iría la lógica para guardar el cliente
        const formData = new FormData(e.target as HTMLFormElement)
        const customer = customerCreateFormDataTransform(formData)
        createCustomers(customer).then(response =>{
            console.log("Cliente creado:", response)
            onOpenChange(false)
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Nuevo Cliente</DialogTitle>
                        <DialogDescription>Añade un nuevo cliente a la base de datos.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="customerName">Nombre de la Empresa</Label>
                            <Input id="customerName" name="customerName" placeholder="Nombre de la empresa" required/>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="contactFirstName">Nombre de Contacto</Label>
                                <Input id="contactFirstName" name="contactFirstName" placeholder="Nombre" required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="contactLastName">Apellido de Contacto</Label>
                                <Input id="contactLastName" name="contactLastName" placeholder="Apellido" required/>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input id="phone" name="phone" placeholder="+34 123 456 789" required/>
                        </div>


                        <div className="grid gap-2">
                            <Label htmlFor="city">Ciudad</Label>
                            <Input id="city" name="city" placeholder="Ciudad" required/>
                        </div>


                        <div className="grid gap-2">
                            <Label htmlFor="country">País</Label>
                            <Select name="country" required>
                                <SelectTrigger id="country" className={"w-full"}>
                                    <SelectValue placeholder="Seleccionar país"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {countries.map((country) => (
                                        <SelectItem key={country.code} value={country.code}>
                                            {country.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="creditLimit">Límite de Crédito</Label>
                            <Input
                                id="creditLimit"
                                name="creditLimit"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">Guardar Cliente</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
