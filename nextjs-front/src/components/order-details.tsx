import React from "react";

import OrderCard from "./order_details/order-card";
import CustomerCard from "./order_details/customer-card";
import SalesRepCard from "./order_details/sales-rep-employee";
import OfficeCard from "./order_details/office-card";
import ProductsCard from "./order_details/products-card";

export default function OrderDetails({ orderId }: { orderId: string }) {
  return (
    <div className="min-h-screen bg-background p-4">
      <header className="max-w-[1400px] mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Orden #{orderId}</h1>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <OrderCard />
          <CustomerCard />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <SalesRepCard />
          <OfficeCard />
        </div>
        <ProductsCard />
      </div>
    </div>
  );
}
