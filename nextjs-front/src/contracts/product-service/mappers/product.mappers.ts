import {IPage} from "@/contracts";
import {IProductTableHome} from "@/contracts/product-service/types/products.type";
import {PageProductDTO, ProductDTO} from "@/contracts/orders-service/generated/models";

export const toProductsHomeTable = (orders: ProductDTO[]): IProductTableHome[] =>{
    return orders.map((product: ProductDTO) => ({
        productCode: product.productCode || "",
        productName: product.productName || "",
        productLine: product.productLine || "",
        productVendor: product.productVendor || "",
        quantityInStock: product.quantityInStock || 0,
        buyPrice: product.buyPrice || 0,
        MSRP: product.msrp || 0,
        status: "active",
    }));
}