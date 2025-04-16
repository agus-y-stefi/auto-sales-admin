export interface FormattedOrderTableHome {
    orderNumber: number
    orderDate: string
    status: string
    customerName: string
    total: number
}

// TODO: Endpoints

export const URL_MS_ORDERS= "http://localhost:8082";

export const URL_ORDERS= URL_MS_ORDERS + "/orders";

