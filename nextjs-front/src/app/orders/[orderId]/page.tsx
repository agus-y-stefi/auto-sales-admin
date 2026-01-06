import {Button} from "@/components/ui/button"
import {ArrowLeft, Printer} from "lucide-react"
import Link from "next/link"
import OrderDetails from "@/components/orders-home/detail/order-details";

interface OrderDetailsPageProps {
    params: Promise<{ orderId: string }>
}

export default async function OrderDetailsPage({params}: OrderDetailsPageProps) {
    const {orderId} = await params

    return (
        <div className="p-6 min-w-2/3 max-w-4/5 mx-auto space-y-6">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                    <Link href="/orders">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4"/>
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Orden #{orderId}</h1>
                </div>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Printer className="h-4 w-4"/>
                    Imprimir
                </Button>
            </div>

            <OrderDetails orderId={orderId} />
        </div>
    )

}
