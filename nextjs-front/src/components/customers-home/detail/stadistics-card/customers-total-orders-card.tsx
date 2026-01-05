import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import React from "react";

export const CustomersTotalOrdersCard = ({totalOrders} : {totalOrders: number}) => {

    return (
        <React.Fragment>
            <Card className="flex-1">
                <CardContent >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <ShoppingCart className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Órdenes
                            </p>
                            <p className="text-2xl font-bold">
                                {totalOrders}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};