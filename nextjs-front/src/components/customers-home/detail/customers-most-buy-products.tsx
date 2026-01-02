import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import React from "react";

export const CustomersMostBuyProducts = () => {

    const statistics = {
        topProducts: [
            {
                productCode: "S10_1678",
                productName: "1969 Harley Davidson Ultimate Chopper",
                quantity: 15,
            },
            {
                productCode: "S10_1949",
                productName: "1952 Alpine Renault 1300",
                quantity: 10,
            },
            {
                productCode: "S10_2016",
                productName: "1996 Moto Guzzi 1100i",
                quantity: 8,
            }
        ]
    };

    return (
        <React.Fragment>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Productos Más Comprados
                    </CardTitle>
                    <CardDescription>
                        Los productos favoritos de este cliente
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                        {statistics.topProducts.map((product, index) => (
                            <div
                                key={product.productCode}
                                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                            >
                                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-bold">
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">
                                        {product.productName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {product.productCode} •{" "}
                                        {product.quantity} unidades
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};
