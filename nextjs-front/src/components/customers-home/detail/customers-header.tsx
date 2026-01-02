import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import React from "react";

export const CustomersHeader = ({customerId} : {customerId : number}) => {
    return (
        <React.Fragment>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/customers">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Cliente #{customerId}
                    </h1>
                </div>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                >
                    <Printer className="h-4 w-4" />
                    Imprimir
                </Button>
            </div>
        </React.Fragment>
    );
};
