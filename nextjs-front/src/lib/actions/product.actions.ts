"use server";

import {
    createProduct,
    updateProduct,
    deleteProduct,
} from "@/contracts/product-service/api";
import type {
    ProductDTO,
    ProductDtoCreateUpdate,
    ApiErrorResponse,
} from "@/contracts/product-service/models";

export type ActionResponse<T> =
    | { success: true; data: T }
    | { success: false; error: string; validationErrors?: Record<string, string> };

export async function createProductAction(
    payload: ProductDtoCreateUpdate,
): Promise<ActionResponse<ProductDTO>> {
    try {
        const res = await createProduct(payload);

        if (res.status === 201) {
            return { success: true, data: res.data as unknown as ProductDTO };
        } else if (res.status === 400) {
            const errorResponse = res.data as unknown as ApiErrorResponse;
            return {
                success: false,
                error: errorResponse.message || "Error de validación",
                validationErrors: errorResponse.validationErrors as Record<string, string> | undefined,
            };
        } else {
            return { success: false, error: "Ocurrió un error inesperado en el servidor" };
        }
    } catch (error) {
        console.error("Error creating product:", error);
        return { success: false, error: "Error de conexión o del servidor" };
    }
}

export async function updateProductAction(
    productCode: string,
    payload: ProductDtoCreateUpdate,
): Promise<ActionResponse<ProductDTO>> {
    try {
        const res = await updateProduct(productCode, payload);

        if (res.status === 200) {
            return { success: true, data: res.data as unknown as ProductDTO };
        }

        const status = (res as unknown as { status: number }).status;
        if (status === 400) {
            const errorResponse = res.data as unknown as ApiErrorResponse;
            return {
                success: false,
                error: errorResponse?.message || "Error de validación",
                validationErrors: errorResponse?.validationErrors as Record<string, string> | undefined,
            };
        }
        if (status === 404) {
            return { success: false, error: "Producto no encontrado" };
        }

        return { success: false, error: "Error al actualizar el producto" };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, error: "Error de conexión o del servidor" };
    }
}

export async function deleteProductAction(
    productCode: string,
): Promise<ActionResponse<void>> {
    try {
        // Pre-check: verify product has no associated orders (cross-service)
        try {
            const checkRes = await fetch(
                `http://localhost:8082/api/order-details/product/${encodeURIComponent(productCode)}/exists`,
            );
            if (checkRes.ok) {
                const hasOrders = await checkRes.json();
                if (hasOrders === true) {
                    return {
                        success: false,
                        error: "No se puede eliminar: existen órdenes asociadas a este producto.",
                    };
                }
            }
        } catch {
            // If orders service is unreachable, proceed with delete and let backend handle it
        }

        const res = await deleteProduct(productCode);
        const status = (res as unknown as { status: number }).status;

        if (status === 200 || status === 204) {
            return { success: true, data: undefined };
        }
        if (status === 409) {
            const errorResponse = (res as unknown as { data: ApiErrorResponse }).data;
            return {
                success: false,
                error: errorResponse?.message || "No se puede eliminar: existen órdenes asociadas a este producto.",
            };
        }
        if (status === 404) {
            return { success: false, error: "Producto no encontrado" };
        }

        return { success: false, error: "Error al eliminar el producto" };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, error: "Error de conexión o del servidor" };
    }
}
