"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCustomer } from "@/contracts/customer-service/api";
import type { CustomerDtoCreate } from "@/contracts/customer-service/models";
import { CreateCustomerHeader } from "./create-customer-header";
import { CustomerFormCard } from "./customer-form-card";

// definimos el schema simplificado (Match con Backend DTO)
const customerSchema = z.object({
    customerName: z
        .string()
        .min(1, "El nombre de la empresa es obligatorio")
        .max(50, "Máximo 50 caracteres"),
    contactFirstName: z.string().min(1, "El nombre de contacto es obligatorio").max(50),
    contactLastName: z.string().min(1, "El apellido de contacto es obligatorio").max(50),
    phone: z.string().min(1, "El teléfono es obligatorio").max(50),
    city: z.string().min(1, "La ciudad es obligatoria").max(50),
    country: z.string().min(1, "El país es obligatorio").max(50),
    // Credit limit opcional, si tiene valor debe ser numérico
    creditLimit: z
        .string()
        .refine((val) => val === "" || !isNaN(Number(val)), "Debe ser un número válido")
        .optional(),
});

// Inferimos el tipo de TypeScript desde Zod
type CustomerSchema = z.infer<typeof customerSchema>;

function useCustomerForm() {
    return useForm({
        defaultValues: {
            customerName: "",
            contactFirstName: "",
            contactLastName: "",
            phone: "",
            city: "",
            country: "",
            creditLimit: "",
        } as CustomerSchema,
        validators: {
            onSubmit: customerSchema,
        },
        onSubmit: async ({ value }) => {
            // Transformar datos si es necesario (ej. creditLimit string -> number)
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
            className="max-w-4xl mx-auto space-y-6"
        >
            <CreateCustomerHeader />

            <CustomerFormCard form={form} />
        </form>
    );
}
