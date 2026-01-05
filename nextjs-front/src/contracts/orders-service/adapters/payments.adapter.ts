
import {getPaymentsByOrderNumber, getRecentPayments as fetchRecentPayments} from "@/clients";
import {toIPayment} from "@/contracts/orders-service/mappers/payments.mappers";


export const fetchPayments = async (orderNumber : number) => {
    const response = await getPaymentsByOrderNumber(orderNumber);

    if (!response.status) {
        throw new Error(`Error fetching payments for order number ${orderNumber}: ${response.status}`);
    }

    return response.data.map(toIPayment);

}

export const getRecentPayments = async (customerId : number) => {
    const response = await fetchRecentPayments(customerId, {size: 5});

    if (response.status != 200) {
        throw new Error(`Error fetching recent payments for customer ID ${customerId}: ${response.status}`);
    }

    return response.data.map(toIPayment);

}