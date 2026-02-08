import OrdersTable from "@/components/orders-home/orders_table";
import {getOrdersHomeTable} from "@/contracts/orders-service/adapters/orders.adapter";

interface PageProps {
    searchParams?: {
        query?: string;
        page?: string;
        limit?: string;
        status?: string
        sort?: string
        dir?: string
    };
}

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const {page="1", limit="5", query, status="", sort, dir} = searchParams || {
        page: "1",
        limit: "5",
        status: "",
    };

    const statusParam = status.split(",");

    const orders = await getOrdersHomeTable(parseInt(page) - 1, parseInt(limit), statusParam, query, sort, dir);

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold my-5 ">Gestor de Ventas Scale Cars</h1>
            <h2 className="text-xl font-bold my-5 ">Ordenes</h2>
            <OrdersTable ordersPage={orders}/>
        </div>
    )
}

