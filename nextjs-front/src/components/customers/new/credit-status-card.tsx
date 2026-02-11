"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CreditCard } from "lucide-react";
import type { CustomerForm } from "./create-customer-page";

const statusOptions = [
    { value: "active", label: "Activo" },
    { value: "inactive", label: "Inactivo" },
    { value: "new", label: "Nuevo" },
    { value: "vip", label: "VIP" },
    { value: "overdue", label: "Moroso" },
    { value: "review", label: "En Revisión" },
] as const;

export function CreditStatusCard({ form }: { form: CustomerForm }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    Crédito y Estado
                </CardTitle>
            </CardHeader>
            <CardContent>
                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Límite de Crédito */}
                    <form.Field name="creditLimit">
                        {(field) => (
                            <Field data-invalid={field.state.meta.errors.length > 0}>
                                <FieldLabel htmlFor={field.name}>Límite de Crédito</FieldLabel>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                        $
                                    </span>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="0.00"
                                        className="pl-7 pr-14"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                        MXN
                                    </span>
                                </div>
                                <FieldError errors={field.state.meta.errors} />
                            </Field>
                        )}
                    </form.Field>

                    {/* Estado */}
                    <form.Field name="status">
                        {(field) => (
                            <Field data-invalid={field.state.meta.errors.length > 0}>
                                <FieldLabel htmlFor={field.name}>Estado</FieldLabel>
                                <Select
                                    name={field.name}
                                    value={field.state.value}
                                    onValueChange={field.handleChange}
                                >
                                    <SelectTrigger id={field.name}>
                                        <SelectValue placeholder="Seleccionar estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FieldError errors={field.state.meta.errors} />
                            </Field>
                        )}
                    </form.Field>
                </FieldGroup>
            </CardContent>
        </Card>
    );
}
