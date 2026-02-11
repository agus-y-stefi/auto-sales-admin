"use client";

import { useForm } from "@tanstack/react-form";
import { CreateCustomerHeader } from "./create-customer-header";
import { CompanyInfoCard } from "./company-info-card";
import { LocationCard } from "./location-card";
import { CreditStatusCard } from "./credit-status-card";

function useCustomerForm() {
    return useForm({
        defaultValues: {
            customerName: "",
            contactFirstName: "",
            contactLastName: "",
            phone: "",
            email: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            creditLimit: "",
            status: "",
        },
        onSubmit: async ({ value }) => {
            console.log("Form submitted:", value);
        },
    });
}

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
            className="max-w-6xl mx-auto space-y-6"
        >
            <CreateCustomerHeader />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <CompanyInfoCard form={form} />
                <LocationCard form={form} />
            </div>

            <CreditStatusCard form={form} />
        </form>
    );
}
