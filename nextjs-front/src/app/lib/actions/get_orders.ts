import {URL_ORDERS, FormattedOrderTableHome, Page } from "@/app/lib/definitions";

export const getOrders = async (
    page: string,
    rowsPerPage: string,
    filterValue: string,
) => {

    console.log("filterValue", filterValue);

    let queryString = new URLSearchParams({
        limit: rowsPerPage,
        page: page,
    }).toString();

    if (filterValue)
        queryString += `&query=${filterValue}`;


    const res = await fetch(`${URL_ORDERS}/resume?${queryString}`)
    if (!res.ok){
        console.log(await res.json())
        throw new Error("Failed to fetch data");
    }

    const data : Page<FormattedOrderTableHome> = await res.json();

    const statusMap: { [key: string]: string } = {
        "Shipped": "Enviado",
        "Pending": "Pendiente",
        "Cancelled": "Cancelado",
        "Returned": "Devuelto",
        "Refunded": "Reembolsado",
        "In Process": "En proceso"
    };

    // Map the status to the Spanish equivalent
    data.content.forEach(order =>
        order.status = statusMap[order.status] || order.status
    );

    return data;
}