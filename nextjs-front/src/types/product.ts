import { PaginatedResponse } from "@/types/customer";

export interface Product {
    productCode: string;
    productName: string;
    productLine: string;
    productScale: string;
    productVendor: string;
    productDescription: string;
    quantityInStock: number;
    buyPrice: number;
    msrp: number;
    productLineDescription: string | null;
}

export interface ProductSummary {
    productCode: string;
    productName: string;
    productLine: string;
    quantityInStock: number;
    buyPrice: number;
    msrp: number;
    productVendor: string;
}

export interface ProductLine {
    productLine: string;
    textDescription: string | null;
    productCount: number;
}

export type { PaginatedResponse };
