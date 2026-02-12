export interface Order {
    orderNumber: number;
    orderDate: string;
    requiredDate: string;
    shippedDate: string | null;
    status: string;
    comments: string | null;
    customerNumber: number;
    total: number;
}
