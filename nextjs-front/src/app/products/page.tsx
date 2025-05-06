import {ProductsTable} from "@/components/products-table";
import { getProductsMock } from "../data/products";
// import {getProducts} from "@/app/lib/actions/get_products"; // DEPENDE DEL BACKEND

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

    const products = getProductsMock(page, limit, query);
    //const products = await getProducts(page, limit, query);

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold my-5 ">Gestor de Productos Scale Cars</h1>
            <ProductsTable productsPage={products}/>
        </div>
    )
}