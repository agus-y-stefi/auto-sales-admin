import { createCustomer } from "@/contracts/customer-service/api";
import {
    ApiErrorResponse,
    CustomerDto,
    CustomerDtoCreate,
} from "@/contracts/customer-service/models";

export type ActionResponse<T> =
    | { success: true; data: T }
    | { success: false; error: string; validationErrors?: Record<string, string> };

export async function createCustomerAction(
    payload: CustomerDtoCreate,
): Promise<ActionResponse<CustomerDto>> {
    try {
        const res = await createCustomer(payload);

        if (res.status === 201) {
            return { success: true, data: res.data as unknown as CustomerDto };
        } else if (res.status === 400) {
            const errorResponse = res.data as unknown as ApiErrorResponse;
            return {
                success: false,
                error: errorResponse.message || "Error de validación",
                validationErrors: errorResponse.validationErrors,
            };
        } else {
            return { success: false, error: "Ocurrió un error inesperado en el servidor" };
        }
    } catch (error) {
        console.error("Error creating customer:", error);
        return { success: false, error: "Error de conexión o del servidor" };
    }
}
