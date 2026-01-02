import { CustomersHeader } from "@/components/customers-home/detail/customers-header";
import { CustomersInfo } from "@/components/customers-home/detail/customers-info";
import { CustomersStadistics } from "@/components/customers-home/detail/customers-stadistics";
import { CustomersFinanceResume } from "@/components/customers-home/detail/customers-finance-resume";
import React, { Suspense } from "react";
import { CustomersMostBuyProducts } from "@/components/customers-home/detail/customers-most-buy-products";
import { CustomersRecentOrders } from "@/components/customers-home/detail/customers-recent-orders";
import { CustomersPaymentsHistory } from "@/components/customers-home/detail/customers-payments-history";
import { CustomersDangerZone } from "@/components/customers-home/detail/customers-danger-zone";
import { getCustomerById } from "@/contracts";
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
                <CustomersHeader customerId={parseInt(id)} />
                <CustomersStadistics />
                <div className="flex gap-5 w-full">
                    <CustomersInfo customerInfo={customer} />
                    <CustomersFinanceResume />
                </div>
                <CustomersMostBuyProducts />
                <CustomersRecentOrders />
                <CustomersPaymentsHistory />
                <CustomersDangerZone customer={customer} />
            </div>
        </React.Fragment>
    );
}
