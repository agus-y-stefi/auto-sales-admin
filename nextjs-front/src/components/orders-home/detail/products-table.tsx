import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatCurrency} from "@/lib/format";
import {fetchOrderDetailsByOrderNumber, IOrder} from "@/contracts";

export const ProductsTable = async ({orderId} : {orderId: string}) => {

    const orderDetails = await fetchOrderDetailsByOrderNumber(parseInt(orderId));

    const totalAmount = orderDetails.reduce((total, item) =>
            total + (item.quantityOrdered * item.priceEach)
     , 0);

    return <React.Fragment>
        <Card>
            <CardHeader>
                <CardTitle>Productos</CardTitle>
                <CardDescription>Detalle de productos en la orden ({orderDetails.length} productos)</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">Código</TableHead>
                            <TableHead>Nombre del Producto</TableHead>
                            <TableHead className="text-right">Precio Unitario</TableHead>
                            <TableHead className="text-right">Cantidad</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderDetails.map((product) => (
                            <TableRow key={product.orderNumber + "-" + product.productCode}>
                                <TableCell className="font-medium">{product.productCode}</TableCell>
                                <TableCell>Producto #{product.productCode}</TableCell>
                                <TableCell className="text-right">{formatCurrency(product.priceEach)}</TableCell>
                                <TableCell className="text-right">{product.quantityOrdered}</TableCell>
                                <TableCell className="text-right">{formatCurrency((product.quantityOrdered * product.priceEach))}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} className="text-right font-medium">
                                Total
                            </TableCell>
                            <TableCell className="text-right font-bold">{formatCurrency(totalAmount)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    </React.Fragment>
}