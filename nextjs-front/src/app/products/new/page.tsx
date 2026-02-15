import { getProductLines } from "@/lib/api/products-api";
import { CreateProductPage } from "@/components/products/new/create-product-page";

export default async function Page() {
    const productLines = await getProductLines();

    return <CreateProductPage productLines={productLines} />;
}
