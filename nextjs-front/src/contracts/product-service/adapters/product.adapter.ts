import {getAllProducts} from "@/contracts/orders-service/generated/api";
import {toProductsHomeTable, toProductsNewOrderTable} from "@/contracts/product-service/mappers/product.mappers";
import {IPage, IProductTableNewOrder} from "@/contracts";
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

export const getProductsNewOrderTable = async (query: string) : Promise<IPage<IProductTableNewOrder>> =>{
    const q = (query == "")? undefined : query;

    const response = await getAllProducts({productCode: query});
    if (!response || !response.data) {
        throw new Error("No products found");
    }

    const products = response.data;
    return {
        content: toProductsNewOrderTable(products.content || []),
        metadata: {
            number: products.number || 0,
            size: products.size || 0,
            totalElements: products.totalElements || 0,
            totalPages: products.totalPages || 0,
        }
    }
}