import {PagedModelCustomerDto} from "@/contracts/clients";
import {ICustomersTableHome, IPage, DEFAULT_PAGE_NULL} from "@/contracts";

export const toCustomersHomeTable = (customers: PagedModelCustomerDto): IPage<ICustomersTableHome> => {

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