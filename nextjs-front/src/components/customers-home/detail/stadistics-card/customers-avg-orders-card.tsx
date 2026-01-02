import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { TrendingUp } from "lucide-react";
import React from "react";

export const CustomersAvgOrdersCard = () => {

    const statistics = {
        averageOrderValue: 29.76,
    };

    return (
        <React.Fragment>
            <Card className="flex-1">
                <CardContent>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Promedio/Orden
                            </p>
                            <p className="text-2xl font-bold">
                                {formatCurrency(statistics.averageOrderValue)}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
