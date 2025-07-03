"use server"

import {Page } from "@/app/lib/definitions/definitions";
import {URL_CUSTOMERS} from "@/app/lib/definitions/customers/customers";
import {FormattedCustomerTableHome} from "@/app/lib/definitions/customers/table_ui";

export const getCustomers = async (page?: string, limit?: string, query?: string): Promise<Page<FormattedCustomerTableHome>> =>{
    let urlQuery = "/";
    if (page || limit || query) {
        urlQuery = "?";
        if (page)
            urlQuery += `page=${parseInt(page, 0) - 1}&`;

        if (limit)
            urlQuery += `limit=${limit}&`;

        if (query)
            urlQuery += `query=${query}&`;

        urlQuery = urlQuery.slice(0, -1); // Remove the trailing '&'
    }
    const response = await fetch(`${URL_CUSTOMERS}${urlQuery}`)

    if (!response.ok)
        throw new Error("Error al obtener los clientes");

    const data:Page<FormattedCustomerTableHome> = await response.json();

    return data;
}