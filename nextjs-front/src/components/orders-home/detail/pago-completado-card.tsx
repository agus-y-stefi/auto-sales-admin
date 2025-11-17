import React from "react";
import {Card, CardContent} from "@/components/ui/card";
import {AlertCircle, CheckCircle2} from "lucide-react";
import {formatCurrency} from "@/lib/format";

export const PagoCompletadoCard = () => {



    return <React.Fragment>
        <Card className={isPaidInFull ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {isPaidInFull ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                        ) : (
                            <AlertCircle className="h-6 w-6 text-yellow-600" />
                        )}
                        <div>
                            <p className="font-semibold text-lg">
                                {isPaidInFull ? "Orden Completamente Pagada" : "Pago Pendiente"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {isPaidInFull
                                    ? `Total pagado: ${formatCurrency(totalPaid)}`
                                    : `Falta pagar: ${formatCurrency(remainingAmount)} de ${formatCurrency(totalAmount)}`}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Pagado</p>
                        <p className="text-2xl font-bold">{formatCurrency(totalPaid)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </React.Fragment>
}