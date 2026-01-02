import React from "react";
import { CustomersDebtCard } from "./stadistics-card/customers-debt-card";
import { CustomersTotalOrdersCard } from "./stadistics-card/customers-total-orders-card";
import { CustomersCompleteOrdersCard } from "./stadistics-card/customers-complete-orders-card";
import { CustomersPendingOrdersCard } from "./stadistics-card/customers-pending-orders-card";
import { CustomersAvgOrdersCard } from "./stadistics-card/customers-avg-orders-card";
export const CustomersStadistics = () => {
    return (
        <React.Fragment>
            <CustomersDebtCard />

            <div className="flex gap-5">
                <CustomersTotalOrdersCard />
                <CustomersCompleteOrdersCard />
                <CustomersPendingOrdersCard />
                <CustomersAvgOrdersCard />
            </div>
        </React.Fragment>
    );
};
