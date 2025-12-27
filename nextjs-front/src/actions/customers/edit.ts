"use server";

import { z } from "zod";
import { ICustomer, updateCustomer } from "@/contracts"; // Tu capa de integración (Orval)
import { UpdateCustomerState } from "./types";
import { customerSchema } from "./schemas"; // Importamos el esquema definido arriba

export async function updateCustomerAction(
    prevState: UpdateCustomerState,
    formData: FormData
): Promise<UpdateCustomerState> {
    const creditLimit = parseFloat(
        (formData.get("creditLimit") as string) || "0"
    );

    const rawData = {
        customerName: formData.get("customerName") as string,
        contactName: formData.get("contactName") as string,
        contactLastName: formData.get("contactLastName") as string,
        phone: formData.get("phone") as string,
        city: formData.get("city") as string,
        country: formData.get("country") as string,
        creditLimit: creditLimit,
    };

    const validatedFields = customerSchema.safeParse(rawData);

    if (!validatedFields.success) {
        const data_original: ICustomer = {
            customerNumber: prevState.data?.customerNumber || 0,
            city: rawData.city,
            contactFirstName: rawData.contactName,
            contactLastName: rawData.contactLastName,
            country: rawData.country,
            creditLimit: creditLimit,
            customerName: rawData.customerName,
            phone: rawData.phone,
        };

        return {
            ...prevState,
            data: data_original,
            success: false,
            message: "Error de validación en el formulario.",
            validationErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const customerPayload: ICustomer = {
        customerNumber: prevState.data?.customerNumber || 0, // ID del estado anterior
        customerName: validatedFields.data.customerName,
        contactFirstName: validatedFields.data.contactName, // Mapeo de form name -> DTO
        contactLastName: validatedFields.data.contactLastName,
        phone: validatedFields.data.phone,
        city: validatedFields.data.city,
        country: validatedFields.data.country,
        creditLimit: validatedFields.data.creditLimit,
    };

    try {
        await updateCustomer(customerPayload.customerNumber, customerPayload);

        return {
            ...prevState,
            success: true,
            message: "Cliente actualizado correctamente",
            data: customerPayload,
            validationErrors: undefined,
            error: undefined,
        };
    } catch (err) {
        console.error("Error updating customer:", err);
        return {
            ...prevState,
            success: false,
            message: "Error al comunicarse con el servidor",
            error: "No se pudo completar la actualización. Intente nuevamente.",
            data: customerPayload, // Mantenemos los datos ingresados para no borrar el form
        };
    }
}
