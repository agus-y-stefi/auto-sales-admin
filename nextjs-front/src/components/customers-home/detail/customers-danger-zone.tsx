"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Trash2, CircleCheck } from "lucide-react";

import { toast } from "sonner";
import React from "react";
import { ICustomer } from "@/contracts";

export const CustomersDangerZone = ({customer} : {customer: ICustomer}) => {

    const [currentStatus, setCurrentStatus] = React.useState<string>(
        customer.status
    );
    const [isUpdatingStatus, setIsUpdatingStatus] =
        React.useState<boolean>(false);
    const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

    const handleStatusChange = (value: string) => {
        setIsUpdatingStatus(true);

        // Simulate API call
        setTimeout(() => {
            setCurrentStatus(value);
            setIsUpdatingStatus(false);
            toast.success("Estado del cliente actualizado correctamente",
                {
                    duration: 2000,
                    closeButton: true,
                    position: "top-center",
                    // richColors: true,
                    icon: <CircleCheck className="h-5 w-5 text-green-500" />,
                }

            );
        }, 1000);
    };
    const handleDelete = () => {
        setIsDeleting(true);
        // Simulate API call
        setTimeout(() => {
            // Redirect or update UI after deletion
            setIsDeleting(false);
        }, 1500);
    };

    return (
        <React.Fragment>
            <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Zona de Peligro
                    </CardTitle>
                    <CardDescription>
                        Acciones que afectan permanentemente al cliente
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">
                                Cambiar Estado del Cliente
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Cambia el estado del cliente a activo, inactivo,
                                pendiente o suspendido
                            </p>
                        </div>
                        <Select
                            value={currentStatus}
                            onValueChange={handleStatusChange}
                            disabled={isUpdatingStatus}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Activo</SelectItem>
                                <SelectItem value="inactive">
                                    Inactivo
                                </SelectItem>
                                <SelectItem value="pending">
                                    Pendiente
                                </SelectItem>
                                <SelectItem value="suspended">
                                    Suspendido
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                        <div>
                            <p className="font-medium text-destructive">
                                Eliminar Cliente
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Esta acción es irreversible. Se eliminarán todos
                                los datos del cliente.
                            </p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="gap-2">
                                    <Trash2 className="h-4 w-4" />
                                    Eliminar
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        ¿Estás seguro?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta acción no se puede deshacer. Se
                                        eliminará permanentemente el cliente
                                        <span className="font-semibold">
                                            {" "}
                                            {customer.customerName}
                                        </span>{" "}
                                        y todos sus datos asociados.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        {isDeleting
                                            ? "Eliminando..."
                                            : "Eliminar"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
