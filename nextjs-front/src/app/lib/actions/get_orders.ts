import {URL_ORDERS, Order} from "@/app/lib/definitions";

export const getOrders = async () => {
    const res = await fetch(`${URL_ORDERS}/resume`)
    if (!res.ok)
        throw new Error("Failed to fetch data");

    const data : Order[] = await res.json();

    const statusMap: { [key: string]: string } = {
        "Shipped": "Enviado",
        "Pending": "Pendiente",
        "Cancelled": "Cancelado",
        "Returned": "Devuelto",
        "Refunded": "Reembolsado",
        "In Process": "En proceso"
    };

    // Map the status to the Spanish equivalent
    data.forEach(order =>
        order.status = statusMap[order.status] || order.status
    );

    return data;
}