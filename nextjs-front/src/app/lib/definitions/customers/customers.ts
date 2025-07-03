import {URL_MS_CUSTOMERS} from "@/app/lib/definitions/definitions";

export const URL_CUSTOMERS = URL_MS_CUSTOMERS + "/customers";

export interface ICreateCustomer {
    customerName: string;
    contactLastName: string;
    contactFirstName: string;
    phone: string;
    city: string;
    country: string;
    creditLimit: number;
}
