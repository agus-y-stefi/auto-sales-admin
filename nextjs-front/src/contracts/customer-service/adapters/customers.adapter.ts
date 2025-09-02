import {getAllCustomers, createCustomer as createCustomerApi, getAllCustomersResponse, PagedModelCustomerDto} from "@/clients";
import {toCustomerDtoCreateUpdate, toCustomersHomeTable} from "../mappers/customers.mappers";
import {ICreateCustomer} from "@/contracts";

export const getCustomersHomeTable = async (page?: number, size?:number, status? : string)=>{
    const response:getAllCustomersResponse = await getAllCustomers({size: size, page: (page)? (page - 1) : undefined, status: status});
    if (!response || !response.data) {
        throw new Error("Failed to fetch customers data");
    }

    const pagedModel: PagedModelCustomerDto = response.data;
    return {
        content: pagedModel.content?.map(customer => toCustomersHomeTable(customer)) || [],
        metadata: {
            size: pagedModel.page?.size || 0,
            number: pagedModel.page?.number || 0,
            totalElements: pagedModel.page?.totalElements || 0,
            totalPages: pagedModel.page?.totalPages || 0
        }
    }

}

export const createCustomers = async (createCustomer : ICreateCustomer) =>{
    const response = await createCustomerApi(toCustomerDtoCreateUpdate(createCustomer));
    if (!response || !response.data) {
        throw new Error("Failed to create customer");
    }
    return toCustomersHomeTable(response.data);
}