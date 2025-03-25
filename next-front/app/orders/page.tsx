import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import OrdersTable from "@/components/orders-table"

export default function OrdersPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Ventas</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Nueva Orden
        </Button>
      </div>

      <OrdersTable />
    </div>
  )
}

