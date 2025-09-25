import OrdersTable from "@/components/orders-home/orders_table";
import {getOrdersHomeTable} from "@/contracts/orders-service/adapters/orders.adapter";


export default async function Page(props: {
    searchParams?: Promise<{
        query: string;
        page: string;
        limit: string;
        status: string
    }>;
}) {
    const searchParams = await props.searchParams;
    const {page="1", limit="10", query, status=""} = searchParams || {
        page: "1",
        limit: "5",
        status: ""
    };

    const statusParam = status.split(",");

    const orders = await  getOrdersHomeTable(parseInt(page) - 1, parseInt(limit), statusParam, query);

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold my-5 ">Gestor de Ventas Scale Cars</h1>
            <h2 className="text-xl font-bold my-5 ">Ordenes</h2>
            <OrdersTable ordersPage={orders}/>
        </div>
    )
}

