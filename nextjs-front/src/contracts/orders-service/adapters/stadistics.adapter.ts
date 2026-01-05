import {getCustomerOrdersInfo as fetchCustomerOrdersInfo} from "@/clients";
import { ICustomersStats } from "../types/stadistics.type";
import { toICustomersStats } from "../mappers/stadistics.mapper";


export const getCustomerOrdersInfo = async (customerId : number) : Promise<ICustomersStats>=>{

    const response = await fetchCustomerOrdersInfo(customerId);

    if(response.status != 200 ){
        throw new Error("Error fetching customer orders info");
    }
    
    const data = await response.data;

    return toICustomersStats(data);

}