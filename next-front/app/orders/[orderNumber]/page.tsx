import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer } from "lucide-react"
import Link from "next/link"
import OrderDetails from "@/components/order-details"

interface OrderDetailsPageProps {
  params: {
    orderNumber: string
  }
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { orderNumber } = params

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Orden #{orderNumber}</h1>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Imprimir
        </Button>
      </div>

      <OrderDetails orderNumber={orderNumber} />
    </div>
  )
}

