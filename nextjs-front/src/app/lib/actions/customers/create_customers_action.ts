"use server";



import {URL_CUSTOMERS} from "@/app/lib/definitions/customers/customers";
import {ICreateCustomer} from "@/contracts";

export const createCustomersAction = async (customer: ICreateCustomer) => {
    const res = await fetch(`${URL_CUSTOMERS}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })

    if (!res.ok) {
        throw new Error("Error al crear el cliente");
    }

    return;
}