"use client";
import * as React from "react";

export const useCustomerCombobox = () => {
    const [selectedCustomer, setSelectedCustomer] = React.useState<string | undefined>(undefined);

    return {
        selectedCustomer,
        setSelectedCustomer
    }
}