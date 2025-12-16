import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

import {getEmployeeById} from "@/contracts";

export const RepresentanteVentasCard = async ({salesRepEmployeeNumber} : {salesRepEmployeeNumber: number}) => {

    const salesRep = await getEmployeeById(salesRepEmployeeNumber);

    return <React.Fragment>
        <Card>
            <CardHeader>
                <CardTitle>Representante de Ventas</CardTitle>
                <CardDescription>Información del representante asignado</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                        <p className="font-medium">{salesRep ? `${salesRep.firstName} ${salesRep.lastName}` : "N/A"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Codigo Oficina</p>
                            <p>{salesRep?.officeCode || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Extensión</p>
                            <p>{salesRep?.extension || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </React.Fragment>
}