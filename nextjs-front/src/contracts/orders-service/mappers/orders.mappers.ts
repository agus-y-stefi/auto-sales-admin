import {IOrderTableHome, IPage, DEFAULT_PAGE_NULL} from "@/contracts";
import {CustomPagedDTOOrderDtoResume} from "@/clients"

export const toOrdersTableHome = (orders: CustomPagedDTOOrderDtoResume): IPage<IOrderTableHome> => {
    if (!orders || !orders.content) {
        return DEFAULT_PAGE_NULL;
    }

    const data : IOrderTableHome[] = orders.content.map(order => {
        return {
            orderNumber: order.orderNumber || 0,
            orderDate: order.orderDate || "",
            status: order.status || "Prepared",
            customerName: order.customerName || "No Name",
            total: order.totalPrice || 0

        }
    })
    return {
        content: data,
        metadata: {
            size: orders.size,
            number: orders.number,
            totalElements: orders.totalElements,
            totalPages: orders.totalPages
        }
    }
}