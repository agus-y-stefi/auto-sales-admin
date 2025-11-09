export interface IOrder {
    orderNumber: number;
    orderDate: string;
    requiredDate: string;
    shippedDate: string;
    status: string;
    comments: string;
    customerNumber: number;
    salesRepEmployeeNumber: number;
}

export interface IOrderTableHome extends Omit<IOrder,
    "requiredDate" | "shippedDate" | "comments" | "salesRepEmployeeNumber" | "customerNumber"
> {
    customerName: string;
    total: number;
}

export interface ICreateOrder extends Omit<IOrder,
    "orderNumber" | "orderDate" | "shippedDate" | "status"
>{

}