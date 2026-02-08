import { ProductsTableHome } from "@/components/products-home/products-table-home";
import { getProductsHomeTable, IProduct } from "@/contracts";
import React from "react";

interface ProductProps {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        limit?: string;
        status?: string;
    }>;
}

export default async function name(props: ProductProps) {
    const searchParams = await props.searchParams;
    const {
        page = "1",
        limit = "5",
        query,
        status = "",
    } = searchParams || {
        page: "1",
        limit: "5",
        status: "",
    };

    const products = await getProductsHomeTable(
        parseInt(page) - 1,
        parseInt(limit),
        query
    );

    return (
        <React.Fragment>
            <div className="container mx-auto p-10">
                <h1 className="text-2xl font-bold my-5 ">
                    Gestor de Ventas Scale Cars
                </h1>
                <h2 className="text-xl font-bold my-5 ">Productos</h2>
                <ProductsTableHome productsPage={products} />
            </div>
        </React.Fragment>
    );
}
