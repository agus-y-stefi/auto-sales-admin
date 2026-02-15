import {
    createCustomer,
    updateCustomer,
    deleteCustomer,
    updateCustomerStatus,
} from "@/contracts/customer-service/api";
import {
    ApiErrorResponse,
    CustomerDto,
    CustomerDtoCreate,
    CustomerDtoUpdate,
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

export async function updateCustomerAction(
    customerId: number,
    payload: CustomerDtoUpdate,
): Promise<ActionResponse<CustomerDto>> {
    try {
        const res = await updateCustomer(customerId, payload);

        if (res.status === 200) {
            return { success: true, data: res.data as unknown as CustomerDto };
        } else if (res.status === 400) {
            const errorResponse = res.data as unknown as ApiErrorResponse;
            return {
                success: false,
                error: errorResponse.message || "Error de validación",
                validationErrors: errorResponse.validationErrors,
            };
        } else if (res.status === 404) {
            const errorResponse = res.data as unknown as ApiErrorResponse;
            return {
                success: false,
                error: errorResponse.message || "Cliente no encontrado",
            };
        } else {
            return { success: false, error: "Error al actualizar el cliente" };
        }
    } catch (error) {
        console.error("Error updating customer:", error);
        return { success: false, error: "Error de conexión o del servidor" };
    }
}

export async function updateCustomerStatusAction(
    customerId: number,
    newStatus: string,
): Promise<ActionResponse<CustomerDto>> {
    try {
        const res = await updateCustomerStatus(customerId, { status: newStatus });

        if (res.status === 200) {
            return { success: true, data: res.data as unknown as CustomerDto };
        } else if (res.status === 404) {
            const errorResponse = res.data as unknown as ApiErrorResponse;
            return {
                success: false,
                error: errorResponse.message || "Cliente no encontrado",
            };
        } else {
            return {
                success: false,
                error: "Error al actualizar el estado del cliente",
            };
        }
    } catch (error) {
        console.error("Error updating customer status:", error);
        return { success: false, error: "Error de conexión o del servidor" };
    }
}

export async function deleteCustomerAction(
    customerId: number,
): Promise<ActionResponse<void>> {
    try {
        const res = await deleteCustomer(customerId);

        if (res.status === 200 || res.status === 204) {
            return { success: true, data: undefined };
        } else {
            const errorResponse = res.data as unknown as ApiErrorResponse;
            return {
                success: false,
                error: errorResponse.message || "Error al eliminar el cliente",
            };
        }
    } catch (error) {
        console.error("Error deleting customer:", error);
        return { success: false, error: "Error de conexión o del servidor" };
    }
}
