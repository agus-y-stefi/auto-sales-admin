import {PagedModelCustomerDto} from "@/contracts";
import {ICustomersTableHome, IPageCustomers} from "@/types/customers-service/customers.type";
import {DEFAULT_PAGE_NULL} from "@/types/commons.types";

export const toCustomersHomeTable = (customers: PagedModelCustomerDto): IPageCustomers<ICustomersTableHome> => {

    if (!customers || !customers.content) {
        return DEFAULT_PAGE_NULL;
    }

    const data: ICustomersTableHome[] = customers.content.map(customer => {
        return {
            customerNumber: customer.customerNumber,
            customerName: customer.customerName,
            contactName: customer.contactFirstName + ' ' + customer.contactLastName ,
            phone: customer.phone,
            city: customer.city,
            country: customer.country,
            creditLimit: customer.creditLimit,
            status: "Activo"
        }
    });

    return {
        content: data,
        metadata: {
            size: customers.page?.size || 0,
            number: customers.page?.number || 0,
            totalElements: customers.page?.totalElements || 0,
            totalPages: customers.page?.totalPages || 0
        }
    }
}