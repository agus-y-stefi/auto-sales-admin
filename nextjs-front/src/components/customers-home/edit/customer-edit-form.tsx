"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useActionState, useEffect, useState } from "react";
import { ICustomer } from "@/contracts";

import { UpdateCustomerState } from "@/actions/customers/types";
import { updateCustomerAction } from "@/actions/customers/edit";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CustomerEditForm({ customer }: { customer: ICustomer }) {
    // router for redirect if needed
    const router = useRouter();

    const initialState: UpdateCustomerState = {
        data: customer,
        success: false,
    };


    const [state, formAction, isPending] = useActionState(
        updateCustomerAction,
        initialState
    );

    const errors = state.validationErrors || {};

    useEffect(() => {
        if (state.success) {

            toast.success(
                "Cliente actualizado con éxito, redireccionando...",
                {
                    duration: 3000,
                }
            );

            setTimeout(() => {
                router.push("/customers");
            }, 2000);
        }
    }, [state]);

    const {
        city,
        contactFirstName,
        contactLastName,
        country,
        creditLimit,
        phone,
        customerName,
    } = state.data || customer;

    return (
        <React.Fragment>
            <form
                className="flex flex-col gap-5 w-full p-4"
                action={formAction}
            >
                <div className="flex flex-col gap-2">
                    <Label htmlFor="customerName">Nombre de la Empresa</Label>
                    <Input
                        id="customerName"
                        placeholder="Nombre de la empresa"
                        name="customerName"
                        defaultValue={customerName}
                    />
                    {errors.customerName && (
                        <span className="text-sm text-red-600">
                            {errors.customerName}
                        </span>
                    )}
                </div>

                <div className="flex w-full gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                        <Label htmlFor="contactName">Nombre del Contacto</Label>
                        <Input
                            id="contactName"
                            placeholder="Nombre del contacto"
                            name="contactName"
                            defaultValue={contactFirstName}
                        />
                        {errors.contactName && (
                            <span className="text-sm text-red-600">
                                {errors.contactName}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <Label htmlFor="contactLastName">
                            Apellido del Contacto
                        </Label>
                        <Input
                            id="contactLastName"
                            placeholder="Apellido del contacto"
                            name="contactLastName"
                            defaultValue={contactLastName}
                        />
                        {errors.contactLastName && (
                            <span className="text-sm text-red-600">
                                {errors.contactLastName}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    {/* telefono */}
                    <Label htmlFor="contactPhone">Teléfono del Contacto</Label>
                    <Input
                        id="contactPhone"
                        placeholder="Teléfono del contacto"
                        name="phone"
                        defaultValue={phone}
                    />
                    {errors.phone && (
                        <span className="text-sm text-red-600">
                            {errors.phone}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                        id="city"
                        placeholder="Ciudad"
                        name="city"
                        defaultValue={city}
                    />
                    {errors.city && (
                        <span className="text-sm text-red-600">
                            {errors.city}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="country">País</Label>
                    <Input
                        id="country"
                        placeholder="País"
                        name="country"
                        defaultValue={country}
                    />
                    {errors.country && (
                        <span className="text-sm text-red-600">
                            {errors.country}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="creditLimit">Límite de Crédito</Label>
                    <Input
                        id="creditLimit"
                        placeholder="Límite de crédito"
                        name="creditLimit"
                        defaultValue={creditLimit?.toString()}
                    />
                    {errors.creditLimit && (
                        <span className="text-sm text-red-600">
                            {errors.creditLimit}
                        </span>
                    )}
                </div>
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </form>
        </React.Fragment>
    );
}