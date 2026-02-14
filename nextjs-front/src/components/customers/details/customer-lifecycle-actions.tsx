"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TriangleAlert, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    updateCustomerStatusAction,
    deleteCustomerAction,
} from "@/lib/actions/customer.actions";

interface CustomerLifecycleActionsProps {
    customerId: number;
    currentStatus: string;
}

const statusOptions = [
    { value: "active", label: "Activo" },
    { value: "inactive", label: "Inactivo" },
    { value: "new", label: "Nuevo" },
    { value: "vip", label: "VIP" },
    { value: "overdue", label: "Moroso" },
    { value: "review", label: "En Revisión" },
];

export function CustomerLifecycleActions({
    customerId,
    currentStatus,
}: CustomerLifecycleActionsProps) {
    const router = useRouter();
    const [status, setStatus] = useState(currentStatus);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isPendingStatus, startStatusTransition] = useTransition();
    const [isPendingDelete, startDeleteTransition] = useTransition();

    const handleStatusChange = (value: string) => {
        const prevStatus = status;
        const label = statusOptions.find((o) => o.value === value)?.label;

        // Optimistic update
        setStatus(value);

        startStatusTransition(async () => {
            const result = await updateCustomerStatusAction(customerId, value);

            if (result.success) {
                toast.success(`Estado del cliente actualizado a ${label}.`);
            } else {
                // Revert on error
                setStatus(prevStatus);
                toast.error(result.error);
            }
        });
    };

    const handleDelete = () => {
        startDeleteTransition(async () => {
            const result = await deleteCustomerAction(customerId);

            if (result.success) {
                toast.success("Cliente eliminado correctamente.");
                setIsDeleteDialogOpen(false);
                router.push("/customers");
            } else {
                setIsDeleteDialogOpen(false);
                toast.error(result.error);
            }
        });
    };

    return (
        <div className="border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/10 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
            <div>
                <h3 className="text-base font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                    <TriangleAlert className="h-5 w-5" />
                    Zona de Riesgo
                </h3>
                <p className="text-sm text-red-600/80 dark:text-red-400/70 mt-1 max-w-xl">
                    Estas acciones son críticas y pueden afectar la visibilidad del cliente en el
                    sistema o eliminar sus datos permanentemente.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                        Estado Actual
                    </span>
                    <Select
                        value={status}
                        onValueChange={handleStatusChange}
                        disabled={isPendingStatus}
                    >
                        <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                            <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="h-8 w-px bg-red-200 dark:bg-red-800 hidden sm:block"></div>

                <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-white hover:bg-red-50 text-red-600 border-red-200 dark:bg-transparent dark:border-red-800 dark:hover:bg-red-900/20 dark:text-red-400 hover:text-red-700"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    disabled={isPendingDelete}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar Cliente
                </Button>
            </div>

            {/* Delete Destructive Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar cliente definitivamente?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción NO se puede deshacer. Se eliminarán permanentemente los
                            datos del cliente y su historial.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isPendingDelete}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isPendingDelete ? "Eliminando..." : "Eliminar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
