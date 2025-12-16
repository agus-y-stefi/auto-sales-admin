
import {createBulkOrderDetails, OrderDetailDtoCreateUpdate, getOrderDetailsByOrderNumber} from "@/clients";
import {IProductSelection} from "@/stores";
import {ToIOrdersDetail} from "@/contracts";

export const fetchOrderDetailsByOrderNumber = async (orderNumber : number) => {

    const response = await getOrderDetailsByOrderNumber(orderNumber);

    if (!response.status || response.status !== 200) {
        throw new Error(`Error fetching order details for order number ${orderNumber}: ${response.status}`);
    }


    const orderDetails = response.data;

    return orderDetails.map(ToIOrdersDetail);
}

export const createOrderDetailsBulk = async (idOrden : number, products : IProductSelection[]) => {

    const orderDetailsCreateDTO : OrderDetailDtoCreateUpdate[] = products.map( p => ({
        orderNumber: idOrden,
        productCode: p.productCode,
        quantityOrdered: p.quantity,
        priceEach: p.price
    }));

    await createBulkOrderDetails(orderDetailsCreateDTO);

    return;

}