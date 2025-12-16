import {OrderDetailDto} from "@/contracts/product-service/generated/models";
import {IOrdersDetail} from "@/contracts";

export const ToIOrdersDetail = (data: OrderDetailDto) : IOrdersDetail => {
    return {
        orderNumber: data.orderNumber || 0,
        productCode: data.productCode || '',
        quantityOrdered: data.quantityOrdered || 0,
        priceEach: data.priceEach || 0,
    }
}