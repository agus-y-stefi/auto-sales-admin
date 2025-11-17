import {PaymentDto} from "@/clients";
import {IPayment} from "@/contracts";

export const toIPayment = (data: PaymentDto): IPayment => {
    return {
        orderNumber: data.orderNumber || 0,
        paymentDate: data.paymentDate || "",
        amount: data.amount || 0,
        checkNumber: data.checkNumber || "",
    }
}