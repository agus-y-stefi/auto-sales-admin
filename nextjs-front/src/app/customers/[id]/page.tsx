import { CustomersHeader } from "@/components/customers-home/detail/customers-header";
import { CustomersInfo } from "@/components/customers-home/detail/customers-info";
import { CustomersStadistics } from "@/components/customers-home/detail/customers-stadistics";
import { CustomersFinanceResume } from "@/components/customers-home/detail/customers-finance-resume";
import React, { Suspense } from "react";
import { CustomersMostBuyProducts } from "@/components/customers-home/detail/customers-most-buy-products";
import { CustomersRecentOrders } from "@/components/customers-home/detail/customers-recent-orders";
import { CustomersPaymentsHistory } from "@/components/customers-home/detail/customers-payments-history";
import { CustomersDangerZone } from "@/components/customers-home/detail/customers-danger-zone";
import {
    getCustomerById,
    getCustomerOrdersInfo,
    getOrderRecentByCustomerId,
    getRecentPayments,
    ICustomer,
    IOrder,
    IPayment,
} from "@/contracts";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
interface CustomerUpdatePageProps {
    params: Promise<{ id: string }>;
}

export default async function CustomerDetailPage({
    params,
}: CustomerUpdatePageProps) {
    const { id } = await params;
    const customer = await getCustomerById(parseInt(id));

    return (
        <React.Fragment>
            <div className="flex flex-col p-10 w-full max-w-7xl mx-auto gap-6">
                <CustomersHeader customerId={customer.customerNumber} />
                <Suspense
                    fallback={<LoadingCard name="estadísticas del cliente" />}
                >
                    <CustomersStadisticsData customer={customer} />
                </Suspense>
                <CustomersMostBuyProducts />
                <Suspense fallback={<LoadingCard name="órdenes recientes" />}>
                    <RecentOrdersData customerId={parseInt(id)} />
                </Suspense>
                <Suspense fallback={<LoadingCard name="historial de pagos" />}>
                    <PaymentsHistoryData customerId={parseInt(id)} />
                </Suspense>
                <CustomersDangerZone customer={customer} />
            </div>
        </React.Fragment>
    );
}

export const LoadingCard = ({ name }: { name: string }) => {
    return (
        <Card className="w-full max-w-7xl mx-auto py-10">
            <CardContent className="flex items-center justify-center gap-3">
                <Spinner color="blue" />
                <p>Cargando información de {name}...</p>
            </CardContent>
        </Card>
    );
};

export const CustomersStadisticsData = async ({
    customer,
}: {
    customer: ICustomer;
}) => {

    const stats = await getCustomerOrdersInfo(customer.customerNumber);

    return (
        <React.Fragment>
            <CustomersStadistics stats={stats} />
            <div className="flex gap-5 w-full">
                <CustomersInfo customerInfo={customer} />
                <CustomersFinanceResume stats={stats} />
            </div>
        </React.Fragment>
    );
};

export const PaymentsHistoryData = async ({
    customerId,
}: {
    customerId: number;
}) => {
    const payments: IPayment[] = await getRecentPayments(customerId);

    return <CustomersPaymentsHistory recentPayments={payments} />;
};

export const RecentOrdersData = async ({
    customerId,
}: {
    customerId: number;
}) => {
    const orders = await getOrderRecentByCustomerId(customerId);

    return <CustomersRecentOrders recentOrders={orders} />;
};
