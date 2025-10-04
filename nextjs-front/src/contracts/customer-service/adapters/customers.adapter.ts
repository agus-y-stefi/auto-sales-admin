import {getAllCustomers, createCustomer, deleteCustomer as deleteCustomerClient } from "@/clients";
import {toCustomerDtoCreate, toCustomersHomeTable} from "../mappers/customers.mappers";
import {ICreateCustomer} from "@/contracts";


export const getCustomersHomeTable = async (page?: number, size?: number, status?: string, query?: string) => {
    const statusArray = status ? status.split(',') : undefined;
    const response  = await getAllCustomers({size: size, page: (page) ? (page - 1) : undefined, status: statusArray, q: query});
    if (!response || !response.data) {
        throw new Error("Failed to fetch customers data");
    }

    const pagedModel = response.data;
    return {
        content: pagedModel.content?.map(customer => toCustomersHomeTable(customer)) || [],
        metadata: {
            size: pagedModel.size || 0,
            number: pagedModel.number || 0,
            totalElements: pagedModel.totalElements || 0,
            totalPages: pagedModel.totalPages || 0
        }
    }
}

export const createCustomers = async (newCustomer: ICreateCustomer) => {
    const response = await createCustomer(toCustomerDtoCreate(newCustomer));

    if (!response || !response.data) {
        throw new Error("Failed to create customer");
    }

    return toCustomersHomeTable(response.data);
}

export const deleteCustomer = async (customerNumber: number) => {
    try {
        await deleteCustomerClient(customerNumber);
    }catch (e){
        throw new Error("Failed to delete customer");
    }
}