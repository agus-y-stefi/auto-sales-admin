"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export function CreateCustomerHeader() {
    const router = useRouter();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Registrar Nuevo Cliente</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Ingresa los detalles para dar de alta un nuevo cliente en el sistema.
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="h-4 w-4" />
                    Guardar Cliente
                </Button>
            </div>
        </div>
    );
}
