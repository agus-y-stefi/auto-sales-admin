import { ICustomer } from "@/contracts";
import { formatCurrency } from "@/lib/format";
import React from "react";

export const CustomersInfoViewCard = ({
    customer,
}: {
    customer: ICustomer;
}) => {
    return (
        <React.Fragment>
            <div className="space-y-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        Nombre de la Empresa
                    </p>
                    <p className="font-semibold text-lg">
                        {customer.customerName}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Contacto
                        </p>
                        <p>
                            {customer.contactFirstName}{" "}
                            {customer.contactLastName}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Teléfono
                        </p>
                        <p>{customer.phone}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Ciudad
                        </p>
                        <p>{customer.city}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            País
                        </p>
                        <p>{customer.country}</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        Límite de Crédito
                    </p>
                    <p className="font-semibold">
                        {formatCurrency(customer.creditLimit)}
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
};
