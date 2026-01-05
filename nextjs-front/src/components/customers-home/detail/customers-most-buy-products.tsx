import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getTopThreeProductsByCustomer } from "@/contracts";
import { Package } from "lucide-react";
import React from "react";

export const CustomersMostBuyProducts = async ({
    customerId,
}: {
    customerId: number;
}) => {
    const topProducts = await getTopThreeProductsByCustomer(customerId);

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
                    {topProducts.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">
                                No hay órdenes registradas
                            </p>
                        </div>
                    )}
                    <div className="grid md:grid-cols-3 gap-4">
                        {topProducts.map((product, index) => (
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
                                        {product.cantidadComprada} unidades
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
