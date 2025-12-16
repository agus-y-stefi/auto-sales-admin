import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IOrder } from "@/contracts";
import { statusOptionsOrdersTableHome } from "@/lib/config/tables/order-home.config";

export const InformacionOrdenCard = ({ orderData }: { orderData: IOrder }) => {

    const status = statusOptionsOrdersTableHome.find((option) => {
        return option.uid.toLowerCase() === orderData.status.toLowerCase();
    });

    return (
        <React.Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Información de la Orden</CardTitle>
                    <CardDescription>
                        Detalles de la orden #{orderData.orderNumber}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Fecha de Orden
                                </p>
                                <p>
                                    {new Date(
                                        orderData.orderDate
                                    ).toLocaleDateString("es-ES")}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Estado
                                </p>
                                {/* @ts-ignore */}
                                <Badge variant={status?.color ?? "outline"}>{status?.name ?? orderData.status}</Badge>
                                
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Fecha Requerida
                                </p>
                                <p>
                                    {new Date(
                                        orderData.requiredDate
                                    ).toLocaleDateString("es-ES")}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Fecha de Envío
                                </p>
                                <p>
                                    {orderData.shippedDate
                                        ? new Date(
                                              orderData.shippedDate
                                          ).toLocaleDateString("es-ES")
                                        : "Pendiente"}
                                </p>
                            </div>
                        </div>
                        {orderData.comments && (
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Comentarios
                                </p>
                                <p className="text-sm">{orderData.comments}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
