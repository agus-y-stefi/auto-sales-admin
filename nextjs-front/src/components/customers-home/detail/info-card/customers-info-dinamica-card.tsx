"use client";
import React from "react";
import { useForm } from "@tanstack/react-form"; // 👈 Importación principal
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICustomerUpdate, updateCustomer } from "@/contracts";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"; // Tus componentes nuevos
import { ICustomer } from "@/contracts";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
    customerName: z.string().min(1, "Customer name is required"),
    contactFirstName: z.string().min(1, "Contact first name is required"),
    contactLastName: z.string().min(1, "Contact last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    creditLimit: z.number().min(0, "Credit limit must be at least 0"),
});

export const CustomersInfoEditCard = ({
    customer,
    setCustomer,
    setIsEditing,
}: {
    customer: ICustomer;
    setCustomer: React.Dispatch<React.SetStateAction<ICustomer>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const onSubmitForm = async ({
        value,
    }: {
        value: Partial<ICustomerUpdate>;
    }) => {
        const customerUpdateData: ICustomerUpdate = {
            customerName: value.customerName ?? customer.customerName,
            contactFirstName:
                value.contactFirstName ?? customer.contactFirstName,
            contactLastName: value.contactLastName ?? customer.contactLastName,
            phone: value.phone ?? customer.phone,
            city: value.city ?? customer.city,
            country: value.country ?? customer.country,
            creditLimit: value.creditLimit ?? customer.creditLimit,
            status: customer.status, // ! Este campo no se edita aquí
        };

        await updateCustomer(customer.customerNumber, customerUpdateData);

        setCustomer((prev) => ({ ...prev, ...value }));
        toast.success("Información del cliente actualizada correctamente.");
        setIsEditing(false);
    };

    const form = useForm({
        defaultValues: {
            customerName: customer.customerName,
            contactFirstName: customer.contactFirstName,
            contactLastName: customer.contactLastName,
            phone: customer.phone,
            city: customer.city,
            country: customer.country,
            creditLimit: customer.creditLimit,
        } as Partial<ICustomerUpdate>,
        validators: {
            onChange: formSchema,
        },
        onSubmit: onSubmitForm,
        onSubmitInvalid: ({ value, formApi }) => {
            const errors = formApi.state.errorMap["onChange"] || {};

            const arrayErrors = Object.values(errors).flatMap((err) =>
                err.map((e) => e.message)
            );

            toast.error(
                <div className="space-y-1">
                    <p className="text-blue-900">
                        Please fix the following errors:
                    </p>
                    <ul>
                        {arrayErrors.map((err, index) => (
                            <li key={index}>- {err}</li>
                        ))}
                    </ul>
                </div>,
                { position: "top-center", closeButton: true, duration: 3000 }
            );
        },
    });

    const handleCancel = () => {
        form.reset(); // Resetea a los defaultValues
        setIsEditing(false);
    };

    return (
        <React.Fragment>
            <form
                id="customer-info-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <FieldGroup>
                    {/* Customer Name */}
                    <form.Field
                        name="customerName"
                        children={(field) => (
                            <InputTextField
                                field={field}
                                label="Nombre de la Empresa"
                                placeholder="Nombre de la Empresa"
                            />
                        )}
                    />

                    {/* Contact First and Last Name */}
                    <FieldSet>
                        <Field orientation={"horizontal"}>
                            <form.Field
                                name="contactFirstName"
                                children={(field) => (
                                    <InputTextField
                                        field={field}
                                        label="Nombre de Contacto"
                                        placeholder="Nombre"
                                    />
                                )}
                            />

                            <form.Field
                                name="contactLastName"
                                children={(field) => (
                                    <InputTextField
                                        field={field}
                                        label="Apellido de Contacto"
                                        placeholder="Apellido"
                                    />
                                )}
                            />
                        </Field>
                    </FieldSet>

                    {/* Phone Number */}
                    <form.Field
                        name="phone"
                        children={(field) => (
                            <InputTextField
                                field={field}
                                label="Teléfono"
                                placeholder="Teléfono"
                            />
                        )}
                    />

                    {/* 3. Grid Ciudad y País */}
                    <div className="grid grid-cols-2 gap-4">
                        <form.Field
                            name="city"
                            children={(field) => {
                                return InputTextField({
                                    field,
                                    label: "Ciudad",
                                    placeholder: "Ciudad",
                                });
                            }}
                        />

                        <form.Field
                            name="country"
                            children={(field) => {
                                return InputTextField({
                                    field,
                                    label: "País",
                                    placeholder: "País",
                                });
                            }}
                        />
                    </div>

                    {/* 4. Límite de Crédito */}
                    <form.Field
                        name="creditLimit"
                        children={(field) => {
                            const isInvalid = !field.state.meta.isValid;
                            return (
                                <Field>
                                    <FieldLabel>Límite de Crédito</FieldLabel>
                                    <Input
                                        type="number"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(
                                                Number(e.target.value)
                                            )
                                        }
                                        aria-invalid={isInvalid}
                                        placeholder={"Límite de Crédito"}
                                        autoComplete="off"
                                    />
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    />
                </FieldGroup>
            </form>

            <div className="flex w-full justify-end gap-2 mt-4 ">
                <form.Subscribe
                    children={(state) => (
                        <Button
                            type="submit"
                            disabled={state.isSubmitting}
                            form="customer-info-form"
                        >
                            {state.isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    )}
                />

                <Button
                    variant="secondary"
                    type="button"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
            </div>
        </React.Fragment>
    );
};

const InputTextField = ({
    field,
    label,
    placeholder,
}: {
    field: any;
    label: string;
    placeholder: string;
}) => {
    const isInvalid = !field.state.meta.isValid;
    return (
        <React.Fragment>
            <Field data-invalid={isInvalid}>
                <FieldLabel data-invalid={isInvalid}>{label}</FieldLabel>
                <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder={placeholder}
                    autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
        </React.Fragment>
    );
};
