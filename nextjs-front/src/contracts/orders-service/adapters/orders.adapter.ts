import {toOrdersTableHome} from "@/contracts/orders-service/mappers/orders.mappers";
import {IOrderTableHome, IPage} from "@/contracts";

import {deleteOrder as deleteOrderClient, getAllOrdersResume} from "@/clients";

export const getOrdersHomeTable = async (page: number, limit:number): Promise<IPage<IOrderTableHome>> =>{
    const response = await getAllOrdersResume({page: page, size: limit});

    if (!response || !response.data) {
        throw new Error("No orders found");
    }

    const orders= response.data;

    return toOrdersTableHome(orders);

}

export const deleteOrder = async (id: number): Promise<void> => {

    try {
        await deleteOrderClient(id);
    }catch (e){
        console.error("Error deleting order:", e);
        throw e;
    }

}