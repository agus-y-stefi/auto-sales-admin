import {
    getAllProducts,
    getAllProductsSummary,
    getProductById,
    getAllProductLines,
} from "@/contracts/product-service/api";
import { Product, ProductSummary, ProductLine } from "@/types/product";
import { PaginatedResponse } from "@/types/customer";
import type {
    ProductDTO,
    ProductSummaryDTO,
    ProductLineDTO,
    CustomPagedDTOProductDTO,
    CustomPagedDTOProductSummaryDTO,
    CustomPagedDTOProductLineDTO,
} from "@/contracts/product-service/models";

// ── Mappers ──────────────────────────────────────────────

function mapProductDtoToProduct(dto: ProductDTO): Product {
    return {
        productCode: dto.productCode ?? "",
        productName: dto.productName ?? "",
        productLine: dto.productLine ?? "",
        productScale: dto.productScale ?? "",
        productVendor: dto.productVendor ?? "",
        productDescription: dto.productDescription ?? "",
        quantityInStock: dto.quantityInStock ?? 0,
        buyPrice: dto.buyPrice ?? 0,
        msrp: dto.msrp ?? 0,
        productLineDescription: dto.productLineDescription?.trim() || null,
    };
}

function mapProductSummaryDtoToSummary(dto: ProductSummaryDTO): ProductSummary {
    return {
        productCode: dto.productCode ?? "",
        productName: dto.productName ?? "",
        productLine: dto.productLine ?? "",
        quantityInStock: dto.quantityInStock ?? 0,
        buyPrice: dto.buyPrice ?? 0,
        msrp: dto.msrp ?? 0,
        productVendor: dto.productVendor ?? "",
    };
}

function mapProductLineDtoToProductLine(dto: ProductLineDTO): ProductLine {
    return {
        productLine: dto.productLine ?? "",
        textDescription: dto.textDescription?.trim() || null,
        productCount: dto.productCount ?? 0,
    };
}

// ── API Functions ────────────────────────────────────────

interface GetProductsParams {
    page?: number;
    size?: number;
    q?: string;
    productLine?: string;
    productVendor?: string;
    productScale?: string;
    sortBy?: string;
    sortDir?: string;
}

/**
 * Fetches products with full details from the backend.
 * Handles page indexing: frontend uses 1-based, backend uses 0-based.
 */
export async function getProducts({
    page = 1,
    size = 10,
    q = "",
    productLine = "",
    productVendor = "",
    productScale = "",
    sortBy,
    sortDir,
}: GetProductsParams = {}): Promise<PaginatedResponse<Product>> {
    const response = await getAllProducts({
        page: page - 1,
        size,
        q: q || undefined,
        productLine: productLine || undefined,
        productVendor: productVendor || undefined,
        productScale: productScale || undefined,
        sortBy: sortBy || undefined,
        sortDir: sortDir || undefined,
    });

    const data = response.data as unknown as CustomPagedDTOProductDTO;

    return {
        content: (data.content ?? []).map(mapProductDtoToProduct),
        totalElements: data.totalElements ?? 0,
        totalPages: data.totalPages ?? 0,
        number: data.number ?? 0,
        size: data.size ?? size,
        first: data.first ?? true,
        last: data.last ?? true,
        hasNext: data.hasNext ?? false,
        hasPrev: data.hasPrev ?? false,
    };
}

/**
 * Fetches products summary (fewer fields, for table views).
 */
export async function getProductsSummary({
    page = 1,
    size = 10,
    q = "",
    productLine = "",
    productVendor = "",
    productScale = "",
    sortBy,
    sortDir,
}: GetProductsParams = {}): Promise<PaginatedResponse<ProductSummary>> {
    const response = await getAllProductsSummary({
        page: page - 1,
        size,
        q: q || undefined,
        productLine: productLine || undefined,
        productVendor: productVendor || undefined,
        productScale: productScale || undefined,
        sortBy: sortBy || undefined,
        sortDir: sortDir || undefined,
    });

    const data = response.data as unknown as CustomPagedDTOProductSummaryDTO;

    return {
        content: (data.content ?? []).map(mapProductSummaryDtoToSummary),
        totalElements: data.totalElements ?? 0,
        totalPages: data.totalPages ?? 0,
        number: data.number ?? 0,
        size: data.size ?? size,
        first: data.first ?? true,
        last: data.last ?? true,
        hasNext: data.hasNext ?? false,
        hasPrev: data.hasPrev ?? false,
    };
}

/**
 * Fetches a single product by code.
 * Returns null if not found or on error.
 */
export async function getProduct(id: string): Promise<Product | null> {
    const response = await getProductById(id);
    if (response.status === 404 || response.status !== 200) {
        return null;
    }
    const dto = response.data as unknown as ProductDTO;
    return mapProductDtoToProduct(dto);
}

/**
 * Fetches all product lines (for filters/selects).
 */
export async function getProductLines(): Promise<ProductLine[]> {
    const response = await getAllProductLines({
        size: 100, // Get all lines (few records)
    });

    const data = response.data as unknown as CustomPagedDTOProductLineDTO;
    return (data.content ?? []).map(mapProductLineDtoToProductLine);
}
