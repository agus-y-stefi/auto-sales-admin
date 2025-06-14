import {CustomersTable} from "@/components/customers-table";
import { getCustomersMock } from "../data/customers";
// import {getCustomers} from "@/app/lib/actions/get_customers"; // DEPENDE DEL BACKEND


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

    const customers = getCustomersMock(page, limit, query);
    //const customers = await getCustomers(page, limit, query);

    const numberOFPages = Number(limit);
    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold my-5 ">Gestor de Ventas Scale Cars</h1>
            <h2 className="text-xl font-bold my-5 ">Clientes</h2>
            <CustomersTable customersPage={customers}/>
        </div>
    )
}