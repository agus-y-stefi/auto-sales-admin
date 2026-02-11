"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";
import type { CustomerForm } from "./create-customer-page";

export function CompanyInfoCard({ form }: { form: CustomerForm }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    Información de la Empresa
                </CardTitle>
            </CardHeader>
            <CardContent>
                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre de la Empresa - full width */}
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

                    {/* Nombre de Contacto */}
                    <form.Field name="contactFirstName">
                        {(field) => {
                            return (
                                <Field data-invalid={field.state.meta.errors.length > 0}>
                                    <FieldLabel htmlFor={field.name}>Nombre de Contacto</FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value ?? ""}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Ej. Juan"
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>

                    {/* Apellido de Contacto */}
                    <form.Field name="contactLastName">
                        {(field) => (
                            <Field data-invalid={field.state.meta.errors.length > 0}>
                                <FieldLabel htmlFor={field.name}>Apellido de Contacto</FieldLabel>
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
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value ?? ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="+52 (55) 1234 5678"
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        )}
                    </form.Field>

                    {/* Correo Electrónico */}
                    <form.Field name="email">
                        {(field) => (
                            <Field data-invalid={field.state.meta.errors.length > 0}>
                                <FieldLabel htmlFor={field.name}>Correo Electrónico</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="email"
                                    value={field.state.value ?? ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="contacto@empresa.com"
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        )}
                    </form.Field>
                </FieldGroup>
            </CardContent>
        </Card>
    );
}
