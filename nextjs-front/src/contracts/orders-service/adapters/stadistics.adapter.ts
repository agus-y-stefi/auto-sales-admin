import {getCustomerOrdersInfo as fetchCustomerOrdersInfo, getTopThreeProductsByCustomer as fetchTopThreeProductsByCustomer} from "@/clients";
import { ICustomersStats, IProduct, ITopProduct } from "@/contracts";
import { toICustomersStats, toITopProduct} from "../mappers/stadistics.mapper";


export const getCustomerOrdersInfo = async (customerId : number) : Promise<ICustomersStats>=>{

    const response = await fetchCustomerOrdersInfo(customerId);

    if(response.status != 200 ){
        throw new Error("Error fetching customer orders info");
    }
    
    const data = await response.data;

    return toICustomersStats(data);

}

export const getTopThreeProductsByCustomer = async (customerId : number) : Promise<ITopProduct[]> => {

    const response = await fetchTopThreeProductsByCustomer(customerId);

    if(response.status != 200 ){
        throw new Error("Error fetching top three products by customer");
    }

    const data = await response.data;

    return toITopProduct(data);
}