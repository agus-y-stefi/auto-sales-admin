
"use client"
import { OrdersTable } from "@/components/orders-table";
import { orders } from "@/app/data/orders";


export default function Page() {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold my-5 ">Gestor de Ventas Scale Cars</h1>
      <OrdersTable orders={orders} />
    </div>
  )
}

