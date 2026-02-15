"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Customer } from "@/types/customer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge, Edit, Save, X } from "lucide-react";
import { formatCurrency, getInitials } from "@/lib/format";
import { getAvatarColor, cn } from "@/lib/utils";
import { toast } from "sonner";
import { updateCustomerAction } from "@/lib/actions/customer.actions";

interface CustomerInfoCardProps {
    customer: Customer;
}

interface EditableFields {
    customerName: string;
    contactFirstName: string;
    contactLastName: string;
    phone: string;
    city: string;
    country: string;
    creditLimit: string;
}

function customerToEditable(customer: Customer): EditableFields {
    return {
        customerName: customer.customerName,
        contactFirstName: customer.contactFirstName,
        contactLastName: customer.contactLastName,
        phone: customer.phone ?? "",
        city: customer.city ?? "",
        country: customer.country ?? "",
        creditLimit: customer.creditLimit?.toString() ?? "",
    };
}

export function CustomerInfoCard({ customer }: CustomerInfoCardProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [fields, setFields] = useState<EditableFields>(() => customerToEditable(customer));
    const [isPending, startTransition] = useTransition();

    const fullName = `${customer.contactFirstName} ${customer.contactLastName}`;
    const initials = getInitials(customer.contactFirstName, customer.contactLastName);
    const avatarColor = getAvatarColor(fullName);

    const handleCancel = () => {
        setFields(customerToEditable(customer));
        setIsEditing(false);
    };

    const handleSave = () => {
        startTransition(async () => {
            const result = await updateCustomerAction(customer.customerNumber, {
                customerName: fields.customerName || undefined,
                contactFirstName: fields.contactFirstName || undefined,
                contactLastName: fields.contactLastName || undefined,
                phone: fields.phone || undefined,
                city: fields.city || undefined,
                country: fields.country || undefined,
                creditLimit: fields.creditLimit ? parseFloat(fields.creditLimit) : undefined,
            });

            if (result.success) {
                toast.success("Datos del cliente actualizados correctamente.");
                setIsEditing(false);
                router.refresh();
            } else {
                toast.error(result.error);
            }
        });
    };

    const updateField = (key: keyof EditableFields, value: string) => {
        setFields((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="bg-card rounded-xl border shadow-sm p-6 relative h-full">
            {/* Action Buttons */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
                {isEditing ? (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancel}
                            disabled={isPending}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={isPending}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Save className="h-4 w-4 mr-1" />
                            {isPending ? "Guardando..." : "Guardar"}
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                        className="text-muted-foreground hover:text-primary"
                    >
                        <Edit className="h-5 w-5" />
                    </Button>
                )}
            </div>

            <h3 className="text-base font-semibold text-foreground mb-6 flex items-center gap-2">
                <Badge className="text-muted-foreground h-5 w-5" />
                Información del Cliente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                {/* Compañía */}
                <FieldCell
                    label="Compañía"
                    isEditing={isEditing}
                    value={fields.customerName}
                    onChange={(v) => updateField("customerName", v)}
                    displayValue={customer.customerName}
                />

                {/* Contacto Principal */}
                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Contacto Principal
                    </span>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <Input
                                value={fields.contactFirstName}
                                onChange={(e) => updateField("contactFirstName", e.target.value)}
                                placeholder="Nombre"
                                className="h-8 text-sm"
                            />
                            <Input
                                value={fields.contactLastName}
                                onChange={(e) => updateField("contactLastName", e.target.value)}
                                placeholder="Apellido"
                                className="h-8 text-sm"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border">
                                <AvatarFallback
                                    className={cn("text-[10px] text-white", avatarColor)}
                                >
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-foreground">
                                {fullName}
                            </span>
                        </div>
                    )}
                </div>

                {/* Teléfono */}
                <FieldCell
                    label="Teléfono"
                    isEditing={isEditing}
                    value={fields.phone}
                    onChange={(v) => updateField("phone", v)}
                    displayValue={customer.phone || "-"}
                    placeholder="+52 (55) 1234 5678"
                />

                {/* Ubicación */}
                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Ubicación
                    </span>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <Input
                                value={fields.city}
                                onChange={(e) => updateField("city", e.target.value)}
                                placeholder="Ciudad"
                                className="h-8 text-sm"
                            />
                            <Input
                                value={fields.country}
                                onChange={(e) => updateField("country", e.target.value)}
                                placeholder="País"
                                className="h-8 text-sm"
                            />
                        </div>
                    ) : (
                        <span className="text-sm text-foreground">
                            {[customer.city, customer.country].filter(Boolean).join(", ") || "-"}
                        </span>
                    )}
                </div>

                {/* Límite de Crédito */}
                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Límite de Crédito
                    </span>
                    {isEditing ? (
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                $
                            </span>
                            <Input
                                type="number"
                                step="0.01"
                                min={0}
                                value={fields.creditLimit}
                                onChange={(e) => updateField("creditLimit", e.target.value)}
                                placeholder="0.00"
                                className="h-8 text-sm pl-7"
                            />
                        </div>
                    ) : (
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(customer.creditLimit)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Componente auxiliar para campos simples ──

interface FieldCellProps {
    label: string;
    isEditing: boolean;
    value: string;
    onChange: (value: string) => void;
    displayValue: string;
    placeholder?: string;
}

function FieldCell({
    label,
    isEditing,
    value,
    onChange,
    displayValue,
    placeholder,
}: FieldCellProps) {
    return (
        <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                {label}
            </span>
            {isEditing ? (
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="h-8 text-sm"
                />
            ) : (
                <span className="text-sm font-medium text-foreground">{displayValue}</span>
            )}
        </div>
    );
}
