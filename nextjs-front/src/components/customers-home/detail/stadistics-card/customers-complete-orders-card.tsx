import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import React from "react";
export const CustomersCompleteOrdersCard = ({completedOrders} : {completedOrders: number}) => {


    return (
        <React.Fragment>
            <Card className="flex-1">
                <CardContent>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Completadas
                            </p>
                            <p className="text-2xl font-bold">
                                {completedOrders}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
