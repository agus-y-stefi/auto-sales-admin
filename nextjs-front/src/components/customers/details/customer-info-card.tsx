import React from "react";
import { Customer } from "@/types/customer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react"; // Using Badge icon as per design
import { Edit } from "lucide-react";
import { formatCurrency, formatLocation, getInitials } from "@/lib/format";
import { getAvatarColor, cn } from "@/lib/utils";

interface CustomerInfoCardProps {
    customer: Customer;
}

export function CustomerInfoCard({ customer }: CustomerInfoCardProps) {
    const fullName = `${customer.contactFirstName} ${customer.contactLastName}`;
    const initials = getInitials(customer.contactFirstName, customer.contactLastName);
    const avatarColor = getAvatarColor(fullName);

    return (
        <div className="bg-card rounded-xl border shadow-sm p-6 relative h-full">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 text-muted-foreground hover:text-primary"
            >
                <Edit className="h-5 w-5" />
            </Button>

            <h3 className="text-base font-semibold text-foreground mb-6 flex items-center gap-2">
                <Badge className="text-muted-foreground h-5 w-5" />
                Información del Cliente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Compañía
                    </span>
                    <span className="text-sm font-medium text-foreground">
                        {customer.customerName}
                    </span>
                </div>

                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Contacto Principal
                    </span>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 border">
                            <AvatarFallback className={cn("text-[10px] text-white", avatarColor)}>
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">{fullName}</span>
                    </div>
                </div>

                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Teléfono
                    </span>
                    <span className="text-sm text-foreground">{customer.phone || "-"}</span>
                </div>

                {/* Email not available in Customer type yet */}

                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Ubicación
                    </span>
                    <span className="text-sm text-foreground">
                        {formatLocation(customer.city, customer.country)}
                    </span>
                </div>

                <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">
                        Límite de Crédito
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(customer.creditLimit)}
                    </span>
                </div>
            </div>
        </div>
    );
}
