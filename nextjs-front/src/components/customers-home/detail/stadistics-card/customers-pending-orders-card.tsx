import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import React from "react";

export const CustomersPendingOrdersCard = ({
    pendingOrders,
}: {
    pendingOrders: number;
}) => {
    return (
        <React.Fragment>
            <Card className="flex-1">
                <CardContent>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Pendientes
                            </p>
                            <p className="text-2xl font-bold">
                                {pendingOrders}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
