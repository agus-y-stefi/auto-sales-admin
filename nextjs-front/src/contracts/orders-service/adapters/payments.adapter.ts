
import {getPaymentById, getPaymentsByOrderNumber} from "@/clients";
import {toIPayment} from "@/contracts/orders-service/mappers/payments.mappers";


export const fetchPayments = async (orderNumber : number) => {
    const response = await getPaymentsByOrderNumber(orderNumber);

    if (!response.status) {
        throw new Error(`Error fetching payments for order number ${orderNumber}: ${response.status}`);
    }

    return response.data.map(toIPayment);

}