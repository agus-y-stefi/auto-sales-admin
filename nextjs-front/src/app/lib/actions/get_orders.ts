import {URL_ORDERS, FormattedOrderTableHome} from "@/app/lib/definitions";

export const getOrders = async (
    page: string,
    rowsPerPage: string,
    filterValue: string,
) => {

    const hasQueryStr = (page || rowsPerPage || filterValue) ? "?" : "";

    const rowsPerPageQ = rowsPerPage ? `limit=${rowsPerPage}` : "15";
    const pageNumberQ = page ? `&page=${page}` : "1";
    const filterQ = filterValue ? `&q=${filterValue}` : "";

    const res = await fetch(`${URL_ORDERS}/resume${hasQueryStr}${rowsPerPageQ}${pageNumberQ}${filterQ}`)
    if (!res.ok){
        console.log(await res.json())
        throw new Error("Failed to fetch data");
    }

    const data : FormattedOrderTableHome[] = await res.json();

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