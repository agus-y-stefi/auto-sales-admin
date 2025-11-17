
import {fetchOrderDetailsByOrderNumber} from "@/contracts"
import {PaymentsTable} from "@/components/orders-home/detail/payments-table";
import {ProductsTable} from "@/components/orders-home/detail/products-table";
import {RepresentanteVentasCard} from "@/components/orders-home/detail/cards/representante-ventas-card";
import {ResumenTotalesCard} from "@/components/orders-home/detail/cards/resumen-totales-card";
import {InformacionClienteCard} from "@/components/orders-home/detail/cards/informacion-cliente-card";
import {InformacionOrdenCard} from "@/components/orders-home/detail/cards/informacion-orden-card";
import {PagoCompletadoCard} from "@/components/orders-home/detail/pago-completado-card";

import {getOrderById, fetchPayments} from "@/contracts";

export default async function OrderDetails({ orderId }: {orderId: string}) {

    const orderData = await getOrderById(parseInt(orderId));

    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)
    const isPaidInFull = totalPaid >= totalAmount
    const remainingAmount = Math.max(0, totalAmount - totalPaid)

    const getStatusLabel = (status: string) => {
        const statusMap: Record<string, string> = {
            shipped: "Enviado",
            processing: "En Proceso",
            pending: "Pendiente",
            cancelled: "Cancelado",
        }
        return statusMap[status] || status
    }

    return (
        <div className="space-y-6">
            <PagoCompletadoCard />

            <div className="grid md:grid-cols-2 gap-6">
                <InformacionOrdenCard orderData={orderData} />
                <InformacionClienteCard customerNumber={orderData.customerNumber}/>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <RepresentanteVentasCard salesRepEmployeeNumber={orderData.salesRepEmployeeNumber}/>
                <ResumenTotalesCard />
            </div>

            <ProductsTable orderId={orderId}/>
            <PaymentsTable orderId={orderId}/>

        </div>
    )
}
