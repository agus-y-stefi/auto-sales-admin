"use client";
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
import React, { useEffect } from "react";
import { deleteCustomer, ICustomer, updateCustomerStatus } from "@/contracts";
import {
    statusOptionsByName,
    statusOptionsByUid,
} from "@/lib/config/tables/customer-home.config";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertDialogDeleteCustomer } from "./danger-zone/alert-dialog-delete-customer";

export const CustomersDangerZone = ({ customer }: { customer: ICustomer }) => {
    const router = useRouter();

    const [isUpdatingStatus, setIsUpdatingStatus] =
        React.useState<boolean>(false);
    const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

    const handleStatusChange = (value: string) => {
        const status = statusOptionsByName.get(value);

        if (!status) {
            toast.error("Estado de cliente inválido", {
                duration: 2000,
                closeButton: true,
                position: "top-center",
            });
            return;
        }

        (async () => {
            setIsUpdatingStatus(true);

            try {
                await updateCustomerStatus(customer.customerNumber, status.uid);

                toast.success("Estado del cliente actualizado correctamente", {
                    duration: 2000,
                    closeButton: true,
                    position: "top-center",
                    // richColors: true,
                    icon: <CircleCheck className="h-5 w-5 text-green-500" />,
                });
            } catch (error) {
                toast.error("Error al actualizar el estado del cliente", {
                    duration: 2000,
                    closeButton: true,
                    position: "top-center",
                });
            } finally {
                setIsUpdatingStatus(false);
            }
        })();
    };

    const handleDeleteCustomer = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            await deleteCustomer(customer.customerNumber);
            toast.success("Cliente eliminado correctamente", {
                duration: 3000,
                closeButton: true,
                position: "top-center",
                // richColors: true,
                icon: <CircleCheck className="h-5 w-5 text-green-500" />,
            });
            router.push("/customers");
        } catch (error) {
            console.error("Error deleting customer:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        if (isDeleting) handleDeleteCustomer();
    }, [isDeleting]);

    if (isDeleting) {
        return (
            <Dialog open={isDeleting} modal={true}>
                <DialogContent showCloseButton={false}>
                    <DialogTitle></DialogTitle>
                    <DialogHeader>
                        <div className="flex gap-2 p-10 w-full justify-center items-center">
                            <Spinner className="h-8 w-8 text-red-600" />
                            <p className="text-lg font-medium text-red-600">
                                Eliminando cliente, espere...
                            </p>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );
    }

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
                                Cambia el estado del cliente a{" "}
                                {Array.from(statusOptionsByName.keys()).reduce(
                                    (prev, curr) => prev + ", " + curr
                                )}
                            </p>
                        </div>
                        <Select
                            defaultValue={
                                statusOptionsByUid.get(customer.status)?.name ||
                                ""
                            }
                            onValueChange={handleStatusChange}
                            disabled={isUpdatingStatus}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from(statusOptionsByName.keys()).map(
                                    (option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    )
                                )}
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
                        <AlertDialogDeleteCustomer
                            customer={customer}
                            isDeleting={isDeleting}
                            setIsDeleting={setIsDeleting}
                        />
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};