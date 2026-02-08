export interface IProduct {
    productCode: string;
    productName: string;
    productLine: string;
    productScale: string;
    productVendor: string;
    productDescription: string;
    quantityInStock: number;
    buyPrice: number;
    msrp: number;
    productLineDescription: string;
}

export interface IProductTableHome
    extends Omit<
        IProduct,
        | "productScale"
        | "productDescription"
        | "productLineDescription"
        | "msrp"
    > {
    MSRP: number;
    status: string;
}

export interface IProductTableNewOrder
    extends Omit<IProductTableHome, "productVendor" | "buyPrice" | "status"> {}

export interface IProductCreateUpdate
    extends Omit<IProduct, "productLineDescription"> {}
