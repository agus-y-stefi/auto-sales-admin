import React from "react";
import { Customer } from "@/types/customer";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAcronym } from "@/lib/format";
import { getAvatarColor, cn } from "@/lib/utils";

interface CustomerHeaderProps {
    customer: Customer;
}

export function CustomerHeader({ customer }: CustomerHeaderProps) {
    // Mock data for fields not yet in Customer interface
    const joinDate = "12 Ene 2021";

    const initials = getAcronym(customer.customerName);
    const avatarColor = getAvatarColor(customer.customerName);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div
                    className={cn(
                        "h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm",
                        avatarColor,
                    )}
                >
                    {initials}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">
                        {customer.customerName}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        ID Cliente: #{customer.customerNumber} • Alta: {joinDate}
                    </p>
                </div>
            </div>
            <Button variant="outline" className="gap-2">
                <Printer className="h-4 w-4" />
                Imprimir Ficha
            </Button>
        </div>
    );
}
