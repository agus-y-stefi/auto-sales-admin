"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {FirstStep} from "@/components/orders-home/new/first-step";

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
                <DialogHeader>
                    <DialogTitle>
                        <div className={"flex flex-col gap-2"}>
                            <p>New Order - Paso 1 de 3</p>
                            <p className={"text-sm font-light"}>Informacion basica de la orden</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className={"w-full"}>
                    <FirstStep />
                </div>
            </DialogContent>
        </Dialog>
    )
}
