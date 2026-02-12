import React from "react";
import { notFound } from "next/navigation";
import { mockCustomers } from "@/lib/mock-customers";
import { CustomerHeader } from "@/components/customers/details/customer-header";
import { CustomerInfoCard } from "@/components/customers/details/customer-info-card";
import { CustomerKpiCards } from "@/components/customers/details/customer-kpi-cards";
import { RecentOrdersTable } from "@/components/customers/details/recent-orders-table";
import { RecentPaymentsTable } from "@/components/customers/details/recent-payments-table";
import { TopProductsCard } from "@/components/customers/details/top-products-card";
import { CustomerLifecycleActions } from "@/components/customers/details/customer-lifecycle-actions";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CustomerDetailsPage({ params }: PageProps) {
    const { id } = await params;

    // Validate id is numeric before parsing
    if (!/^\d+$/.test(id)) {
        return notFound();
    }

    const customerId = parseInt(id, 10);

    // mockCustomers uses numeric customerNumber
    const customer = mockCustomers.find((c) => c.customerNumber === customerId);

    if (!customer) {
        return notFound();
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <CustomerHeader customer={customer} />
                {/* Placeholders for future sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <CustomerInfoCard customer={customer} />
                    </div>
                    <div className="lg:col-span-1">
                        <CustomerKpiCards customer={customer} />
                    </div>
                </div>
                {/* Product Analysis (Phase 4) */}
                <TopProductsCard customerId={customerId} />

                {/* Transaction History Section (Phase 3) */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <RecentOrdersTable customerId={customerId} />
                    <RecentPaymentsTable customerId={customerId} />
                </div>
                {/* Lifecycle Management (Phase 5) */}
                <CustomerLifecycleActions customerId={customerId} />
            </div>
        </div>
    );
}
