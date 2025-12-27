import React from "react";

import { getCustomerById } from "@/contracts";
import { CustomerEditForm } from "@/components/customers-home/edit/customer-edit-form";
import { Card } from "@/components/ui/card";

interface CustomerUpdatePageProps {
    params: Promise<{ id: string }>;
}

export default async function CustomerUpdatePage({
    params,
}: CustomerUpdatePageProps) {
    const { id } = await params;

    const customer = await getCustomerById(parseInt(id));

    return (
        <React.Fragment>
            <Card className="flex flex-col items-center justify-center max-w-xl mx-auto">
                <h1>Customer Edit Form</h1>
                <CustomerEditForm customer={customer} />
            </Card>
        </React.Fragment>
    );
}
