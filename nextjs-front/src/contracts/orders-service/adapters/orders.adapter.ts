import {
    toOrders,
    toOrdersTableHome,
    toOrdersWithPaymentInfo,
} from "@/contracts/orders-service/mappers/orders.mappers";
import {
    ICreateOrder,
    IOrder,
    IOrderResumeWithPaymentInfo,
    IOrderTableHome,
    IPage,
} from "@/contracts";
import {
    createOrder as createOrderClient,
    OrderDtoCreateUpdate,
    getOrderById as getOrderByIdClient,
    getOrderByIdWithPaymentResume,
} from "@/clients";

import {
    deleteOrder as deleteOrderClient,
    getAllOrdersResume,
    getRecentOrders as fetchRecentOrders,
} from "@/clients";

export const getOrdersHomeTable = async (
    page: number,
    limit: number,
    status?: string[],
    q?: string,
    sort?:string,
    dir?:string
): Promise<IPage<IOrderTableHome>> => {

    const sortParam = sort ? { sortBy: sort, sortDir: dir || "asc" } : {};

    const response = await getAllOrdersResume({
        page: page,
        size: limit,
        status: status,
        q: q,
        ...sortParam
    });

    if (!response || !response.data) {
        throw new Error("No orders found");
    }

    const orders = response.data;

    return toOrdersTableHome(orders);
};

export const deleteOrder = async (id: number): Promise<void> => {
    try {
        await deleteOrderClient(id);
    } catch (e) {
        console.error("Error deleting order:", e);
        throw e;
    }
};

export const createOrder = async (orderData: ICreateOrder) => {
    const orderDataDTO: OrderDtoCreateUpdate = {
        status: "In Process",
        comments: orderData.comments,
        requiredDate: orderData.requiredDate,
        customerNumber: orderData.customerNumber,
        salesRepEmployeeNumber: orderData.salesRepEmployeeNumber,
    };

    const r = await createOrderClient(orderDataDTO);
    return r.data.orderNumber || 0;

    // const r = await createOrderClient()
};

export const getOrderById = async (orderId: number): Promise<IOrder> => {
    const response = await getOrderByIdClient(orderId);

    if (!response || !response.data) {
        throw new Error("No order found");
    }

    return toOrders(response.data);
};

export const fetchOrderByIdWithPaymentInfo = async (
    orderId: number
): Promise<IOrderResumeWithPaymentInfo> => {
    const response = await getOrderByIdWithPaymentResume(orderId);

    if (!response || !response.data) {
        throw new Error("No order found");
    }

    return toOrdersWithPaymentInfo(response.data);
};

export const getOrderRecentByCustomerId = async (
    customerId: number
): Promise<IOrderResumeWithPaymentInfo[]> => {
    const response = await fetchRecentOrders(customerId);

    if (!response || !response.data) {
        throw new Error("No orders found");
    }

    const orders = response.data;

    return orders.map((order) => toOrdersWithPaymentInfo(order));
};
