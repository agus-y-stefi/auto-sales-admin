"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import OrdersTable from "@/components/orders-table"
import { NewOrderModal } from "@/components/new-order-modal"

export default function OrdersPage() {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Ventas</h1>
        <Button
          variant="secondary"
          className="flex items-center gap-2 bg-neutral-800 text-white hover:bg-neutral-700"
          onClick={() => setIsNewOrderModalOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          Nueva Orden
        </Button>
      </div>

      <OrdersTable />

      <NewOrderModal open={isNewOrderModalOpen} onOpenChange={setIsNewOrderModalOpen} />
    </div>
  )
}

