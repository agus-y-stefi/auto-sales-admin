import {OrdersTable} from "@/app/components/orders-table";
import {getCustomersHomeTable} from "@/contracts"
import {getOrdersHomeTable} from "@/contracts/orders-service/adapters/orders.adapter";
import {getOrdersMock} from "@/app/lib/data/orders";


export default async function Page(props: {
    searchParams?: Promise<{
        query: string;
        page: string;
        limit: string;
        status: string
    }>;
}) {
    const searchParams = await props.searchParams;
    const {page="1", limit="5", query="", status=""} = searchParams || {
        page: "1",
        limit: "5",
        query: "",
        status: ""
    };

    // const orders = await  getOrdersHomeTable(parseInt(page), parseInt(limit));
    const orders = getOrdersMock(page, limit, query)

    const numberOFPages = Number(limit);
    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold my-5 ">Gestor de Ventas Scale Cars</h1>
            <h2 className="text-xl font-bold my-5 ">Ordenes</h2>
            <OrdersTable ordersPage={orders}/>
        </div>
    )
}

