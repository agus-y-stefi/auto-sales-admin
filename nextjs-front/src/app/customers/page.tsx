import { getCustomersHomeTable } from "@/contracts/customer-service/adapters/customers.adapter";
import CustomersTable from "@/components/customers-home/customers_table";
import React from "react";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        limit?: string;
        status?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const { page, limit = "5", query, status } = searchParams || {};

    const customers = await getCustomersHomeTable(
        parseInt(page || "0"),
        parseInt(limit),
        status,
        query
    );

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold my-5 ">
                Gestor de Ventas Scale Cars
            </h1>
            <h2 className="text-xl font-bold my-5 ">Clientes</h2>
            <CustomersTable customersPage={customers} />
        </div>
    );
}
