// src/app/customers/schemas.ts (Recomendado separar)
import { z } from "zod";

export const customerSchema = z.object({
    customerName: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres"),
    contactName: z.string().min(2, "El nombre de contacto es requerido"), // Ojo: en tu form se llama "contactName", en BD "contactFirstName"
    contactLastName: z.string().min(2, "El apellido es requerido"),
    phone: z.string().min(5, "Número de teléfono inválido"),
    city: z.string().min(2, "Ciudad requerida"),
    country: z.string().min(2, "País requerido"),
    // Usamos coerce para transformar el string del input a number automáticamente
    creditLimit: z.coerce
        .number()
        .min(0, "El límite de crédito no puede ser negativo"),
});
