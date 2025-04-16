import {OrdersTable} from "@/components/orders-table";
import {orders} from "@/app/data/orders";

import {getOrders} from "@/app/lib/actions/get_orders";


export default async function Page(props: {
    searchParams?: Promise<{
        query: string;
        page: string;
        limit: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const {page, limit, query} = searchParams || {
        page: "1",
        limit: "5",
        query: "",
    };

    const orders = await getOrders(page, limit, query);

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold my-5 ">Gestor de Ventas Scale Cars</h1>
            <OrdersTable orders={orders} rowsPerPage={Number(limit)}/>
        </div>
    )
}

