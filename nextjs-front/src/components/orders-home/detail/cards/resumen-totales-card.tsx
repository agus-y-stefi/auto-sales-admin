import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {formatCurrency} from "@/lib/format";
import { IOrderPaymentInfo } from "@/contracts";

export const ResumenTotalesCard = ({paymentInfo} : {paymentInfo : IOrderPaymentInfo}) =>{

    const { totalPaidAmount: totalPaid, remainingAmount, totalAmount } = paymentInfo;

    return <React.Fragment>
        <Card>
            <CardHeader>
                <CardTitle>Resumen de Totales</CardTitle>
                <CardDescription>Información de costos de la orden</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                        <p className="text-sm text-muted-foreground">Subtotal</p>
                        <p className="font-medium">{formatCurrency(totalAmount)}</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                        <p className="text-sm text-muted-foreground">Total Pagado</p>
                        <p className="font-medium">{formatCurrency(totalPaid)}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <p className="font-semibold">Saldo Pendiente</p>
                        <p className={`font-bold text-lg ${remainingAmount > 0 ? "text-yellow-600" : "text-green-600"}`}>
                            {formatCurrency(remainingAmount)}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </React.Fragment>
}