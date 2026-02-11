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
import { Building2, MapPin, CreditCard, User, Phone } from "lucide-react";
import type { CustomerForm } from "./create-customer-page";

const countries = ["México", "Estados Unidos", "Canadá", "Colombia", "Argentina", "Chile"] as const;

export function CustomerFormCard({ form }: { form: CustomerForm }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Información del Cliente</CardTitle>
                <CardDescription>
                    Complete los detalles para registrar un nuevo cliente en el sistema.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldGroup className="space-y-4">
                    {/* SECCIÓN 1: IDENTIDAD CORPORATIVA */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            <Building2 className="h-4 w-4" />
                            <span>Identidad Corporativa</span>
                        </div>
                        <div className="h-px bg-border" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre de la Empresa - full width en mobile, span 2 en desktop si se quiere, pero aqui grid 2 cols esta bien */}
                            <div className="col-span-1 md:col-span-2">
                                <form.Field name="customerName">
                                    {(field) => (
                                        <Field data-invalid={field.state.meta.errors.length > 0}>
                                            <FieldLabel htmlFor={field.name}>
                                                Nombre de la Empresa
                                            </FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value ?? ""}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Ej. AutoMotores Del Sur S.A."
                                            />
                                            {field.state.meta.errors.length > 0 && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )}
                                </form.Field>
                            </div>

                            {/* Contacto: Nombre y Apellido */}
                            <form.Field name="contactFirstName">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>
                                            Nombre de Contacto
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value ?? ""}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Ej. Juan"
                                                className="pl-9"
                                            />
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        </div>
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>

                            <form.Field name="contactLastName">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>
                                            Apellido de Contacto
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value ?? ""}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Ej. Pérez"
                                        />
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>

                            {/* Teléfono */}
                            <form.Field name="phone">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>Teléfono</FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value ?? ""}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="+52 (55) 1234 5678"
                                                className="pl-9"
                                            />
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        </div>
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>
                        </div>
                    </div>

                    {/* SECCIÓN 2: LOGÍSTICA Y OPERACIONES */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            <MapPin className="h-4 w-4" />
                            <span>Ubicación y Finanzas</span>
                        </div>
                        <div className="h-px bg-border" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Ciudad */}
                            <form.Field name="city">
                                {(field) => (
                                    <Field data-invalid={field.state.meta.errors.length > 0}>
                                        <FieldLabel htmlFor={field.name}>Ciudad</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value ?? ""}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Ej. Monterrey"
                                        />
                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>

                            {/* País */}
                            <div className="col-span-1 md:col-span-2">
                                <form.Field name="country">
                                    {(field) => (
                                        <Field data-invalid={field.state.meta.errors.length > 0}>
                                            <FieldLabel htmlFor={field.name}>País</FieldLabel>
                                            <Select
                                                name={field.name}
                                                value={field.state.value ?? ""}
                                                onValueChange={field.handleChange}
                                            >
                                                <SelectTrigger id={field.name}>
                                                    <SelectValue placeholder="Seleccionar país" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {countries.map((country) => (
                                                        <SelectItem key={country} value={country}>
                                                            {country}
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
                            </div>

                            {/* Límite de Crédito */}
                            <div className="col-span-1 md:col-span-3">
                                <form.Field name="creditLimit">
                                    {(field) => (
                                        <Field data-invalid={field.state.meta.errors.length > 0}>
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                                                <FieldLabel htmlFor={field.name}>
                                                    Límite de Crédito
                                                </FieldLabel>
                                            </div>
                                            <div className="relative mt-1.5">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                                    $
                                                </span>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value ?? ""}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) =>
                                                        field.handleChange(e.target.value)
                                                    }
                                                    placeholder="0.00"
                                                    className="pl-7 pr-14"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                                    MXN
                                                </span>
                                            </div>
                                            {field.state.meta.errors.length > 0 && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )}
                                </form.Field>
                            </div>
                        </div>
                    </div>
                </FieldGroup>
            </CardContent>
        </Card>
    );
}
