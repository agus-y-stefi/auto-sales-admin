import {getAllCustomers, getAllCustomersResponse, PagedModelCustomerDto} from "@/clients";
import {toCustomersHomeTable} from "../mappers/customers.mappers";

export const getCustomersHomeTable = async ()=>{
    const response:getAllCustomersResponse = await getAllCustomers()
    if (!response || !response.data) {
        throw new Error("Failed to fetch customers data");
    }

    const pagedModel: PagedModelCustomerDto = response.data;

    return toCustomersHomeTable(pagedModel);
}
