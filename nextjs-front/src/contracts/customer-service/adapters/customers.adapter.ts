import {
    getAllCustomers,
    createCustomer,
    deleteCustomer as deleteCustomerClient,
    getCustomerById as getCUstomerByIdClient,
    updateCustomer as updateCustomerClient,
} from "@/clients";
import {
    toCustomer,
    toCustomerDtoCreate,
    toCustomerMinimalData,
    toCustomersHomeTable,
} from "../mappers/customers.mappers";
import { ICreateCustomer, ICustomer, ICustomerMinimalData, ICustomerUpdate } from "@/contracts";

export const getCustomersHomeTable = async (
    page?: number,
    size?: number,
    status?: string,
    query?: string
) => {
    const statusArray = status ? status.split(",") : undefined;
    const response = await getAllCustomers({
        size: size,
        page: page ? page - 1 : undefined,
        status: statusArray,
        q: query,
    });
    if (!response || !response.data) {
        throw new Error("Failed to fetch customers data");
    }

    const pagedModel = response.data;
    return {
        content:
            pagedModel.content?.map((customer) =>
                toCustomersHomeTable(customer)
            ) || [],
        metadata: {
            size: pagedModel.size || 0,
            number: pagedModel.number || 0,
            totalElements: pagedModel.totalElements || 0,
            totalPages: pagedModel.totalPages || 0,
        },
    };
};

export const createCustomers = async (newCustomer: ICreateCustomer) => {
    const response = await createCustomer(toCustomerDtoCreate(newCustomer));

    if (!response || !response.data) {
        throw new Error("Failed to create customer");
    }

    return toCustomersHomeTable(response.data);
};

export const deleteCustomer = async (customerNumber: number) => {
    try {
        await deleteCustomerClient(customerNumber);
    } catch (e) {
        throw new Error("Failed to delete customer");
    }
};

export const getCustomerById = async (customerNumber: number) => {
    const response = await getCUstomerByIdClient(customerNumber);

    if (!response || !response.data) {
        throw new Error("Failed to fetch customer data");
    }

    return toCustomer(response.data);
};

export const getCustomersMinimalData = async (): Promise<
    ICustomerMinimalData[]
> => {
    const response = await getAllCustomers();
    if (!response || !response.data) {
        throw new Error("Failed to fetch customers data");
    }

    const pagedModel = response.data;
    const customers = pagedModel.content || [];

    return customers.map((customer) => toCustomerMinimalData(customer));
};

export const updateCustomer = async (
    customerNumber: number,
    updatedCustomer: ICustomerUpdate
) => {
    const response = await updateCustomerClient(customerNumber, updatedCustomer);

    if (!response || !response.data) {
        throw new Error("Failed to update customer");
    }

    return toCustomer(response.data);
};