import {getAllOrders} from "@/contracts/product-service/generated/api";
import {PageOrderDto} from "@/contracts/product-service/generated/models";
import {toOrdersTableHome} from "@/contracts/orders-service/mappers/orders.mappers";
import {IOrderTableHome, IPage} from "@/contracts";

export const getOrdersHomeTable = async (page: number, limit:number): Promise<IPage<IOrderTableHome>> =>{
    const response = await getAllOrders({page: page, size: limit});

    if (!response || !response.data) {
        throw new Error("No orders found");
    }

    const orders:PageOrderDto = response.data;

    return toOrdersTableHome(orders);

}