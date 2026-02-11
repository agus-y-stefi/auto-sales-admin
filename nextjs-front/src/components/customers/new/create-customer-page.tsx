"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { createCustomerAction } from "@/lib/actions/customer.actions";
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
    const router = useRouter();

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
            onChange: customerSchema,
        },
        onSubmit: async ({ value, formApi }) => {
            const payload: CustomerDtoCreate = {
                ...value,
                creditLimit: value.creditLimit ? parseFloat(value.creditLimit) : undefined,
            };

            const result = await createCustomerAction(payload);

            if (result.success) {
                toast.success("Cliente creado exitosamente");
                router.push("/customers");
                return;
            }

            if (result.validationErrors) {
                Object.entries(result.validationErrors).forEach(([field, message]) => {
                    if (field in value) {
                        // @ts-expect-error: pushFieldMeta might not be in the type definition but is available in runtime
                        formApi.pushFieldMeta(field as keyof CustomerSchema, (prev: any) => ({
                            ...prev,
                            errorMap: { server: message },
                        }));
                    }
                });
                toast.error("Por favor corrija los errores en el formulario");
                return;
            }

            toast.error(result.error);
            return;
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
