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
import { MapPin } from "lucide-react";
import type { CustomerForm } from "./create-customer-page";

const countries = ["México", "Estados Unidos", "Canadá", "Colombia", "Argentina", "Chile"] as const;

export function LocationCard({ form }: { form: CustomerForm }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    Ubicación
                </CardTitle>
            </CardHeader>
            <CardContent>
                <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Dirección Completa - full width */}
                    <div className="col-span-1 md:col-span-3">
                        <form.Field name="address">
                            {(field) => (
                                <Field data-invalid={field.state.meta.errors.length > 0}>
                                    <FieldLabel htmlFor={field.name}>Dirección Completa</FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value ?? ""}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Calle, Número, Colonia"
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )}
                        </form.Field>
                    </div>

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

                    {/* Estado */}
                    <form.Field name="state">
                        {(field) => (
                            <Field data-invalid={field.state.meta.errors.length > 0}>
                                <FieldLabel htmlFor={field.name}>Estado</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value ?? ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Ej. Nuevo León"
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        )}
                    </form.Field>

                    {/* Código Postal */}
                    <form.Field name="postalCode">
                        {(field) => (
                            <Field data-invalid={field.state.meta.errors.length > 0}>
                                <FieldLabel htmlFor={field.name}>Código Postal</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value ?? ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Ej. 64000"
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        )}
                    </form.Field>

                    {/* País - full width */}
                    <div className="col-span-1 md:col-span-3">
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
                </FieldGroup>
            </CardContent>
        </Card>
    );
}
