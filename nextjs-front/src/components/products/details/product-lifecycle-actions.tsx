"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { deleteProductAction } from "@/lib/actions/product.actions";

interface ProductLifecycleActionsProps {
    productCode: string;
}

export function ProductLifecycleActions({ productCode }: ProductLifecycleActionsProps) {
    const router = useRouter();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isPendingDelete, startDeleteTransition] = useTransition();

    const handleDelete = () => {
        startDeleteTransition(async () => {
            const result = await deleteProductAction(productCode);

            if (result.success) {
                toast.success("Producto eliminado correctamente.");
                setIsDeleteDialogOpen(false);
                router.push("/products");
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
                    Eliminar un producto es una acción irreversible. Asegúrate de que el producto
                    no esté asociado a órdenes activas antes de proceder.
                </p>
            </div>

            <Button
                variant="outline"
                className="w-full sm:w-auto bg-white hover:bg-red-50 text-red-600 border-red-200 dark:bg-transparent dark:border-red-800 dark:hover:bg-red-900/20 dark:text-red-400 hover:text-red-700"
                onClick={() => setIsDeleteDialogOpen(true)}
                disabled={isPendingDelete}
            >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar Producto
            </Button>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar producto definitivamente?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción NO se puede deshacer. Se eliminarán permanentemente los
                            datos del producto <strong className="text-foreground">{productCode}</strong>.
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
