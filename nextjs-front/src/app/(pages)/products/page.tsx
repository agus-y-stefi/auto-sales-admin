import {ProductsTable} from "@/app/components/products-table";
import {getProductsHomeTable} from "@/contracts"

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

    const products = await getProductsHomeTable(parseInt(page) - 1, parseInt(limit));

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold my-5 ">Gestor de Productos Scale Cars</h1>
            <h2 className="text-xl font-bold my-5 ">Productos</h2>
            <ProductsTable productsPage={products}/>
        </div>
    )
}