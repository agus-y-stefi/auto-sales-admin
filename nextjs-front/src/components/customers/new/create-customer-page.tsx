"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { CreateCustomerHeader } from "./create-customer-header";
import { CompanyInfoCard } from "./company-info-card";
import { LocationCard } from "./location-card";
import { CreditStatusCard } from "./credit-status-card";

// definimos el schema con campos opcionales reales
const customerSchema = z.object({
    customerName: z
        .string()
        .min(1, "El nombre de la empresa es obligatorio")
        .max(100, "Máximo 100 caracteres"),
    contactFirstName: z.string().min(1, "El nombre de contacto es obligatorio"),
    contactLastName: z.string().min(1, "El apellido de contacto es obligatorio"),
    phone: z.string().min(1, "El teléfono es obligatorio"),
    // Email opcional pero si se escribe debe ser válido
    email: z.string().email("Ingresa un email válido").optional().or(z.literal("")),
    address: z.string().optional(),
    city: z.string().min(1, "La ciudad es obligatoria"),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().min(1, "El país es obligatorio"),
    // Credit limit opcional, si tiene valor debe ser numérico
    creditLimit: z
        .string()
        .refine((val) => val === "" || !isNaN(Number(val)), "Debe ser un número válido")
        .optional(),
    status: z.string().min(1, "El estado es obligatorio"),
});

// Inferimos el tipo de TypeScript desde Zod
type CustomerSchema = z.infer<typeof customerSchema>;

function useCustomerForm() {
    return useForm({
        // Casteamos los valores por defecto al tipo inferido
        defaultValues: {
            customerName: "",
            contactFirstName: "",
            contactLastName: "",
            phone: "",
            email: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            creditLimit: "",
            status: "",
        } as CustomerSchema,
        validators: {
            onSubmit: customerSchema,
        },
        onSubmit: async ({ value }) => {
            console.log("Form submitted:", value);
        },
    });
}

// Exportamos el helper type para usar en los componentes hijos
export type CustomerForm = ReturnType<typeof useCustomerForm>;

export function CreateCustomerPage() {
    const form = useCustomerForm();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="max-w-6xl mx-auto space-y-6"
        >
            <CreateCustomerHeader />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <CompanyInfoCard form={form} />
                <LocationCard form={form} />
            </div>

            <CreditStatusCard form={form} />
        </form>
    );
}
