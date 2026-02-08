"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { IProductCreateUpdate } from "@/contracts";
import { useForm } from "@tanstack/react-form";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export const NewProductModal = () => {
    const [open, onOpenChange] = useState(false);

    const onSubmitForm = async ({
        value,
    }: {
        value: IProductCreateUpdate;
    }) => {
        console.log("Submitting form with value:", value);
        
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

    };

    const form = useForm({
        defaultValues: {
            productCode: "",
            productName: "",
            productLine: "",
            productScale: "",
            productVendor: "",
            productDescription: "",
            quantityInStock: 0,
            buyPrice: 0,
            msrp: 0,
        } as IProductCreateUpdate,
        onSubmit: onSubmitForm,
    });

    const handleCancel = () => {
        form.reset();
        onOpenChange(false);
    };

    return (
        <React.Fragment>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>
                    <Button
                        onClick={() => {
                            // setIsNewOrderModalOpen(true);
                            onOpenChange(true);
                        }}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Producto
                    </Button>
                </DialogTrigger>
                <DialogContent className="min-w-3xl px-8">
                    <DialogHeader>
                        <DialogTitle>
                            <div className={"flex flex-col gap-2"}>
                                <p>Nuevo Producto</p>
                                <p className={"text-sm font-light"}>
                                    Informacion basica del producto
                                </p>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        id="new-product-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup>
                            <form.Field
                                name="productCode"
                                children={(field) => (
                                    <InputTextField
                                        field={field}
                                        label="Codigo del Producto"
                                        placeholder="Ingrese el codigo del producto"
                                    />
                                )}
                            />
                            <form.Field
                                name="productName"
                                children={(field) => (
                                    <InputTextField
                                        field={field}
                                        label="Nombre del Producto"
                                        placeholder="Ingrese el nombre del producto"
                                    />
                                )}
                            />

                            <form.Field
                                name="productScale"
                                children={(field) => (
                                    <InputTextField
                                        field={field}
                                        label="Escala del Producto"
                                        placeholder="Ingrese la escala del producto"
                                    />
                                )}
                            />

                            <form.Field
                                name="productDescription"
                                children={(field) => (
                                    <InputTextField
                                        field={field}
                                        label="Descripcion del Producto"
                                        placeholder="Ingrese la descripcion del producto"
                                    />
                                )}
                            />
                            <form.Field
                                name="quantityInStock"
                                children={(field) => (
                                    <InputTextField
                                        field={field}
                                        label="Cantidad en Stock"
                                        placeholder="Ingrese la cantidad en stock"
                                    />
                                )}
                            />
                            <div className="flex gap-5">
                                <form.Field
                                    name="buyPrice"
                                    children={(field) => (
                                        <InputTextField
                                            field={field}
                                            label="Precio de Compra"
                                            placeholder="Ingrese el precio de compra"
                                        />
                                    )}
                                />
                                <form.Field
                                    name="msrp"
                                    children={(field) => (
                                        <InputTextField
                                            field={field}
                                            label="MSRP"
                                            placeholder="Ingrese el MSRP"
                                        />
                                    )}
                                />
                            </div>

                            <form.Field
                                name="productVendor"
                                children={(field) => (
                                    <InputTextField
                                        field={field}
                                        label="Vendedor del Producto"
                                        placeholder="Ingrese el vendedor del producto"
                                    />
                                )}
                            />
                            <form.Field
                                name="productLine"
                                children={(field) => (
                                    <InputTextField
                                        field={field}
                                        label="Linea del Producto"
                                        placeholder="Ingrese la linea del producto"
                                    />
                                )}
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
                                    {state.isSubmitting
                                        ? "Saving..."
                                        : "Save Changes"}
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
                </DialogContent>
            </Dialog>
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
