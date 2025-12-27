import { ICustomer } from "@/contracts";

export type UpdateCustomerState = {
    success: boolean;
    message?: string;
    data?: ICustomer;
    // Estructura de errores de Zod planada (flattened)
    validationErrors?: {
        [key: string]: string[] | undefined;
    };
    // Errores generales del servidor
    error?: string;
};
