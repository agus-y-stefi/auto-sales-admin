
import {createBulkOrderDetails, OrderDetailDtoCreateUpdate} from "@/clients";
import {IProductSelection} from "@/stores";

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