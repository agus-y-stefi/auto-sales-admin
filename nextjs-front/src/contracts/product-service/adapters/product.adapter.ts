import {getAllProducts} from "@/contracts/orders-service/generated/api";
import {toProductsHomeTable} from "@/contracts/product-service/mappers/product.mappers";
import {IPage} from "@/contracts";
import {IProductTableHome} from "@/contracts/product-service/types/products.type";

export const getProductsHomeTable = async (page:number, size:number) : Promise<IPage<IProductTableHome>> =>{
    const response = await getAllProducts({page, size});
    if (!response || !response.data) {
        throw new Error("No products found");
    }

    const products = response.data;
    return {
        content: toProductsHomeTable(products.content || []),
        metadata: {
            number: products.number || 0,
            size: products.size || 0,
            totalElements: products.totalElements || 0,
            totalPages: products.totalPages || 0,

        }
    };
}