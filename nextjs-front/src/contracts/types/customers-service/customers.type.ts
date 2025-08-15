import {PageMetadata} from "@/contracts";

export interface IPageCustomers<T> {
    content: T[];
    metadata: PageMetadata;
}
export interface ICustomersTableHome {
    customerNumber: number;
    customerName: string;
    contactName: string;
    phone: string;
    city: string;
    country: string;
    creditLimit: number;
    status: string;
}