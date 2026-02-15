"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { createProductAction } from "@/lib/actions/product.actions";
import type { ProductDtoCreateUpdate } from "@/contracts/product-service/models";
import type { ProductLine } from "@/types/product";
import { CreateProductHeader } from "./create-product-header";
import { ProductFormCard } from "./product-form-card";

const productSchema = z.object({
    productCode: z
        .string()
        .min(1, "El código del producto es obligatorio")
        .max(15, "Máximo 15 caracteres")
        .regex(/^[A-Z0-9_]+$/, "Solo letras mayúsculas, números y guion bajo"),
    productName: z
        .string()
        .min(1, "El nombre del producto es obligatorio")
        .max(70, "Máximo 70 caracteres"),
    productLine: z.string().min(1, "La línea de producto es obligatoria"),
    productScale: z.string().min(1, "La escala es obligatoria"),
    productVendor: z
        .string()
        .min(1, "El fabricante es obligatorio")
        .max(50, "Máximo 50 caracteres"),
    productDescription: z.string().optional(),
    quantityInStock: z
        .string()
        .refine(
            (val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 32767),
            "Debe ser un número entre 0 y 32,767",
        )
        .optional(),
    buyPrice: z
        .string()
        .refine(
            (val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0),
            "Debe ser un número positivo",
        )
        .optional(),
    msrp: z
        .string()
        .refine(
            (val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0),
            "Debe ser un número positivo",
        )
        .optional(),
});

type ProductSchema = z.infer<typeof productSchema>;

function useProductForm() {
    const router = useRouter();

    return useForm({
        defaultValues: {
            productCode: "",
            productName: "",
            productLine: "",
            productScale: "",
            productVendor: "",
            productDescription: "",
            quantityInStock: "",
            buyPrice: "",
            msrp: "",
        } as ProductSchema,
        validators: {
            onSubmit: productSchema,
        },
        onSubmit: async ({ value }) => {
            const payload: ProductDtoCreateUpdate = {
                productCode: value.productCode,
                productName: value.productName,
                productLine: value.productLine,
                productScale: value.productScale,
                productVendor: value.productVendor,
                productDescription: value.productDescription || undefined,
                quantityInStock: value.quantityInStock
                    ? parseInt(value.quantityInStock, 10)
                    : 0,
                buyPrice: value.buyPrice ? parseFloat(value.buyPrice) : 0,
                msrp: value.msrp ? parseFloat(value.msrp) : 0,
            };

            const result = await createProductAction(payload);

            if (result.success) {
                toast.success("Producto creado exitosamente");
                router.push("/products");
                return;
            }

            if (result.validationErrors) {
                Object.entries(result.validationErrors).forEach(([, message]) => {
                    toast.error(message);
                });
                return;
            }

            toast.error(result.error);
        },
    });
}

export type ProductForm = ReturnType<typeof useProductForm>;

interface CreateProductPageProps {
    productLines: ProductLine[];
}

export function CreateProductPage({ productLines }: CreateProductPageProps) {
    const form = useProductForm();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="max-w-4xl mx-auto space-y-6"
        >
            <CreateProductHeader />
            <ProductFormCard form={form} productLines={productLines} />
        </form>
    );
}
