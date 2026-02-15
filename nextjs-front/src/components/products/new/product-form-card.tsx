"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Package, Ruler, DollarSign, Truck } from "lucide-react";
import type { ProductForm } from "./create-product-page";
import type { ProductLine } from "@/types/product";

const scales = [
    "1:10",
    "1:12",
    "1:18",
    "1:24",
    "1:32",
    "1:50",
    "1:72",
    "1:700",
] as const;

interface ProductFormCardProps {
    form: ProductForm;
    productLines: ProductLine[];
}

export function ProductFormCard({ form, productLines }: ProductFormCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Información del Producto</CardTitle>
                <CardDescription>
                    Complete los detalles para registrar un nuevo producto en el catálogo.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldGroup className="space-y-4">
                    {/* SECCIÓN 1: IDENTIFICACIÓN */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            <Package className="h-4 w-4" />
                            <span>Identificación del Producto</span>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <form.Field name="productCode">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>
                                            Código de Producto
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value ?? ""}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value.toUpperCase())
                                            }
                                            placeholder="Ej. S10_1678"
                                            maxLength={15}
                                        />
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>

                            <div className="col-span-1 md:col-span-2">
                                <form.Field name="productName">
                                    {(field) => (
                                        <Field data-invalid={field.state.meta.errors.length > 0}>
                                            <FieldLabel htmlFor={field.name}>
                                                Nombre del Producto
                                            </FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value ?? ""}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                placeholder="Ej. 1969 Harley Davidson Ultimate Chopper"
                                                maxLength={70}
                                            />
                                            {field.state.meta.errors.length > 0 && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )}
                                </form.Field>
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN 2: CLASIFICACIÓN */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            <Ruler className="h-4 w-4" />
                            <span>Clasificación</span>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <form.Field name="productLine">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>
                                            Línea de Producto
                                        </FieldLabel>
                                        <Select
                                            name={field.name}
                                            value={field.state.value ?? ""}
                                            onValueChange={field.handleChange}
                                        >
                                            <SelectTrigger id={field.name}>
                                                <SelectValue placeholder="Seleccionar línea" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {productLines.map((line) => (
                                                    <SelectItem
                                                        key={line.productLine}
                                                        value={line.productLine}
                                                    >
                                                        {line.productLine}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>

                            <form.Field name="productScale">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>Escala</FieldLabel>
                                        <Select
                                            name={field.name}
                                            value={field.state.value ?? ""}
                                            onValueChange={field.handleChange}
                                        >
                                            <SelectTrigger id={field.name}>
                                                <SelectValue placeholder="Seleccionar escala" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {scales.map((scale) => (
                                                    <SelectItem key={scale} value={scale}>
                                                        {scale}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>

                            <form.Field name="productVendor">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>Fabricante</FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value ?? ""}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                placeholder="Ej. Min Lin Diecast"
                                                className="pl-9"
                                                maxLength={50}
                                            />
                                            <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        </div>
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* SECCIÓN 3: STOCK Y PRECIOS */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            <DollarSign className="h-4 w-4" />
                            <span>Stock y Precios</span>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <form.Field name="quantityInStock">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>
                                            Cantidad en Stock
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            min={0}
                                            max={32767}
                                            value={field.state.value ?? ""}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            placeholder="0"
                                        />
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>

                            <form.Field name="buyPrice">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>
                                            Precio de Compra
                                        </FieldLabel>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                                $
                                            </span>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                step="0.01"
                                                min={0}
                                                value={field.state.value ?? ""}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                placeholder="0.00"
                                                className="pl-7"
                                            />
                                        </div>
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>

                            <form.Field name="msrp">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>MSRP</FieldLabel>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                                $
                                            </span>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                step="0.01"
                                                min={0}
                                                value={field.state.value ?? ""}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                placeholder="0.00"
                                                className="pl-7"
                                            />
                                        </div>
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* SECCIÓN 4: DESCRIPCIÓN */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-6">
                            <form.Field name="productDescription">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>
                                            Descripción del Producto
                                        </FieldLabel>
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value ?? ""}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            placeholder="Descripción detallada del producto..."
                                            rows={4}
                                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[100px]"
                                        />
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>
                        </div>
                    </div>
                </FieldGroup>
            </CardContent>
        </Card>
    );
}
