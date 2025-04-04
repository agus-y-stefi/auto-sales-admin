"use client"
import { OrdersTable } from "@/components/orders-table";
import { orders } from "@/app/data/orders";


export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">User Management</h1>
      <OrdersTable orders={orders} />
    </div>
  )
}

