"use client";
import { dummyEditCustomerAction } from "@/actions/customers/edit2";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ICustomer } from "@/contracts";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { CustomersInfoViewCard } from "./info-card/customers-info-estatica-card";
import { CustomersInfoEditCard } from "./info-card/customers-info-dinamica-card";

export const CustomersInfo = ({
    customerInfo,
}: {
    customerInfo: ICustomer;
}) => {
    const [customer, setCustomer] = useState<ICustomer>(customerInfo);

    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
        <React.Fragment>
            <Card className="flex-1">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Información del Cliente</CardTitle>
                        <CardDescription>
                            Datos de contacto y ubicación
                        </CardDescription>
                    </div>
                    {!isEditing && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-transparent"
                            onClick={() => setIsEditing(true)}
                        >
                            <Pencil className="h-4 w-4" />
                            Editar
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    {isEditing ? (
                        <CustomersInfoEditCard
                            customer={customer}
                            setCustomer={setCustomer}
                            setIsEditing={setIsEditing}
                        />
                    ) : (
                        <CustomersInfoViewCard customer={customer} />
                    )}
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
