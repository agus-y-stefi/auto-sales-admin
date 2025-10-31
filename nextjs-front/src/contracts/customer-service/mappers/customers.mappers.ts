import {CustomerDto, CustomerDtoCreate} from "@/contracts/clients";
import {ICustomersTableHome, IPage, DEFAULT_PAGE_NULL, ICreateCustomer} from "@/contracts";

export const toCustomersHomeTable = (customer: CustomerDto): ICustomersTableHome => {
    return {
        customerNumber: customer.customerNumber,
        customerName: customer.customerName,
        contactName: customer.contactFirstName + ' ' + customer.contactLastName,
        phone: customer.phone,
        city: customer.city,
        country: customer.country,
        creditLimit: customer.creditLimit,
        status: customer.status
    }
}

export const toCustomerDtoCreate = (customer: ICreateCustomer): CustomerDtoCreate=> {
    return {
        customerName: customer.customerName,
        contactFirstName: customer.contactFirstName,
        contactLastName: customer.contactLastName,
        phone: customer.phone,
        city: customer.city,
        country: customer.country,
        creditLimit: customer.creditLimit,
    }
}