import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {formatCurrency} from "@/lib/format";

import {getCustomerById} from "@/contracts";

export const InformacionClienteCard = async ({customerNumber} : {customerNumber : number}) => {


    const customer =  await getCustomerById(customerNumber);

    return <React.Fragment>
        <Card>
            <CardHeader>
                <CardTitle>Cliente</CardTitle>
                <CardDescription>Información del cliente</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                        <p className="font-medium">{customer?.customerName }</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Contacto</p>
                        <p>{customer?.contactFirstName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                            <p>{customer?.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Límite de Crédito</p>
                            <p>{formatCurrency(customer?.creditLimit)}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Ubicación</p>
                        <p>
                            {customer?.city}, {customer?.country}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </React.Fragment>
}