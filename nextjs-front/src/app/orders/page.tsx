import {OrdersTable} from "@/components/orders-table";
import {orders} from "@/app/data/orders";

import {getOrders} from "@/app/lib/actions/get_orders";


export default async function Page() {
    const orders = await getOrders();

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold my-5 ">Gestor de Ventas Scale Cars</h1>
            <OrdersTable orders={orders}/>
        </div>
    )
}

