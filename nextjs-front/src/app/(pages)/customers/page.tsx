import {CustomersTable} from "@/app/components/customers-table";
import {getCustomersMock} from "@/app/lib/data/customers";
import {getCustomers} from "../../lib/actions/customers/get_customers_action";
import {getCustomersHomeTable} from "@/contracts/customer-service/adapters/customers.adapters";


export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        limit?: string;
        status?: string
    }>;
}) {
    const searchParams = await props.searchParams;
    const {page, limit = "5", query, status} = searchParams || {};


    const customers = getCustomersMock(page, limit, query);
    //   const customers = await getCustomers(page, limit, query);
    const customersFromApi = await getCustomersHomeTable();

    const numberOFPages = Number(limit);
    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold my-5 ">Gestor de Ventas Scale Cars</h1>
            <h2 className="text-xl font-bold my-5 ">Clientes</h2>
            <CustomersTable customersPage={customers}/>
        </div>
    )
}