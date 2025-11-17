
import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {IOrder} from "@/contracts";

const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
        shipped: "bg-green-100 text-green-800 hover:bg-green-100/80",
        processing: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
        pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
        cancelled: "bg-red-100 text-red-800 hover:bg-red-100/80",
    }
    return statusMap[status] || "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
}

export const InformacionOrdenCard = ({orderData} : {orderData : IOrder}) => {
    return <React.Fragment>
        <Card>
            <CardHeader>
                <CardTitle>Información de la Orden</CardTitle>
                <CardDescription>Detalles de la orden #{orderData.orderNumber}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Fecha de Orden</p>
                            <p>{new Date(orderData.orderDate).toLocaleDateString("es-ES")}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Estado</p>
                            <Badge variant="outline" className={getStatusColor(orderData.status)}>
                                {getStatusLabel(orderData.status)}
                            </Badge>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Fecha Requerida</p>
                            <p>{new Date(orderData.requiredDate).toLocaleDateString("es-ES")}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Fecha de Envío</p>
                            <p>
                                {orderData.shippedDate
                                    ? new Date(orderData.shippedDate).toLocaleDateString("es-ES")
                                    : "Pendiente"}
                            </p>
                        </div>
                    </div>
                    {orderData.comments && (
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Comentarios</p>
                            <p className="text-sm">{orderData.comments}</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    </React.Fragment>
}