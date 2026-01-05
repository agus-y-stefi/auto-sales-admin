import React from "react";
import { CustomersDebtCard } from "./stadistics-card/customers-debt-card";
import { CustomersTotalOrdersCard } from "./stadistics-card/customers-total-orders-card";
import { CustomersCompleteOrdersCard } from "./stadistics-card/customers-complete-orders-card";
import { CustomersPendingOrdersCard } from "./stadistics-card/customers-pending-orders-card";
import { CustomersAvgOrdersCard } from "./stadistics-card/customers-avg-orders-card";
import { getCustomerOrdersInfo, ICustomersStats } from "@/contracts";

export const CustomersStadistics = async ({ stats }: { stats : ICustomersStats }) => {

    const ordenesPendientes = stats.cantidadOrdenes - stats.ordenesCompletadas;

    return (
        <React.Fragment>
            <CustomersDebtCard statistics={stats}/>

            <div className="flex gap-5">
                <CustomersTotalOrdersCard totalOrders={stats.cantidadOrdenes} />
                <CustomersCompleteOrdersCard completedOrders={stats.ordenesCompletadas} />
                <CustomersPendingOrdersCard pendingOrders={ordenesPendientes} />
                <CustomersAvgOrdersCard averageOrderValue={stats.precioPromedio} />
            </div>
        </React.Fragment>
    );
};
