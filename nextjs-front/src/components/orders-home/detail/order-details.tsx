import { fetchOrderByIdWithPaymentInfo } from "@/contracts";
import { PaymentsTable } from "@/components/orders-home/detail/payments-table";
import { ProductsTable } from "@/components/orders-home/detail/products-table";
import { RepresentanteVentasCard } from "@/components/orders-home/detail/cards/representante-ventas-card";
import { ResumenTotalesCard } from "@/components/orders-home/detail/cards/resumen-totales-card";
import { InformacionClienteCard } from "@/components/orders-home/detail/cards/informacion-cliente-card";
import { InformacionOrdenCard } from "@/components/orders-home/detail/cards/informacion-orden-card";
import { PagoCompletadoCard } from "@/components/orders-home/detail/pago-completado-card";

export default async function OrderDetails({ orderId }: { orderId: string }) {

    console.log('Fetching order details for orderId:', orderId);

    const orderData = await fetchOrderByIdWithPaymentInfo(parseInt(orderId));

    const getStatusLabel = (status: string) => {
        const statusMap: Record<string, string> = {
            shipped: "Enviado",
            processing: "En Proceso",
            pending: "Pendiente",
            cancelled: "Cancelado",
        };
        return statusMap[status] || status;
    };

    return (
        <div className="space-y-6">
            <PagoCompletadoCard paymentInfo={orderData.paymentInfo} />

            <div className="grid md:grid-cols-2 gap-6">
                <InformacionOrdenCard orderData={orderData} />
                <InformacionClienteCard
                    customerNumber={orderData.customerNumber}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <RepresentanteVentasCard
                    salesRepEmployeeNumber={orderData.salesRepEmployeeNumber}
                />
                <ResumenTotalesCard paymentInfo={orderData.paymentInfo}/>
            </div>

            <ProductsTable orderId={orderId} />
            <PaymentsTable orderId={orderId} />
        </div>
    );
}
