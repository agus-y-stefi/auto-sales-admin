"use client"

import {Button} from "@/components/ui/button"
import {useOrderStore} from "@/stores"
import {Check, ChevronLeft} from "lucide-react"
import React, {useEffect, useState} from "react"
import {getCustomerById, getEmployeeById, ICustomer, IEmployee} from "@/contracts";
import {formatCurrency} from "@/lib/format";
import {createOrder, createOrderDetailsBulk} from "@/contracts";

import {toast} from "sonner";
import {createBulkOrderDetails} from "@/contracts/product-service/generated/api";

export const ThirdStep = ({onOpenChange}: { onOpenChange: (open: boolean) => void }) => {

    const setStep = useOrderStore(state => state.setStep);

    return <React.Fragment>
        <div className="py-4 ">
            <div className="space-y-6">
                {/* Order Summary */}

                <OrderSummary/>

                {/* Products Summary */}
                <ProductsSummary/>

            </div>

            <BottomActions onOpenChange={onOpenChange}/>

        </div>
    </React.Fragment>
}

const OrderSummary = () => {

    const {customerId, salesRepId: employeeId, comments, requiredDate} = useOrderStore(state => state);

    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | undefined>(undefined);
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | undefined>(undefined);

    useEffect(() => {
        if (customerId) {
            getCustomerById(parseInt(customerId))
                .then(customer => setSelectedCustomer(customer));
        }
        if (employeeId) {
            getEmployeeById(parseInt(employeeId))
                .then(employee => setSelectedEmployee(employee));
        }

    }, [customerId, employeeId]);


    return <React.Fragment>
        <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-lg">Información de la Orden</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Cliente</p>
                    <p className="font-medium">{selectedCustomer?.customerName}</p>
                    <p className="text-xs text-muted-foreground">
                        {selectedCustomer?.city}, {selectedCustomer?.country}
                    </p>
                </div>
                <div>
                    <p className="text-muted-foreground">Responsable de Venta</p>
                    <p className="font-medium">
                        {selectedEmployee?.firstName} {selectedEmployee?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{selectedEmployee?.officeCode} - {selectedEmployee?.extension}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Fecha Requerida</p>
                    {(requiredDate) ?
                        <p className="font-medium">{new Date(requiredDate).toLocaleDateString()}</p>
                        : <p className="font-medium">No especificada</p>
                    }
                </div>
                {comments && (
                    <div className="col-span-2">
                        <p className="text-muted-foreground">Comentarios</p>
                        <p className="font-medium">{comments}</p>
                    </div>
                )}
            </div>
        </div>
    </React.Fragment>
}

const ProductsSummary = () => {

    const selectedProducts = Object.values(useOrderStore(state => state.selectedProducts));

    const totalAmount = selectedProducts.reduce((total, product) =>
            total + (product.price * product.quantity)
        , 0);


    return <React.Fragment>
        {selectedProducts.length > 0 ? (
            <div className="rounded-lg border p-4 space-y-3">
                <h3 className="font-semibold text-lg">Productos ({selectedProducts.length})</h3>
                <div className="space-y-2">
                    {Array.from(selectedProducts.values()).map((product) => (
                        <div
                            key={product.productCode}
                            className="flex justify-between items-center py-2 border-b last:border-0"
                        >
                            <div>
                                <p className="font-medium">{product.productName}</p>
                                <p className="text-sm text-muted-foreground">
                                    Código: {product.productCode} | Cantidad: {product.quantity}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">{formatCurrency(product.quantity * product.price)}</p>
                                <p className="text-sm text-muted-foreground">{formatCurrency(product.price)} c/u</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(totalAmount)}</span>
                </div>
            </div>
        ) : (
            <div className="rounded-lg border p-4 text-center text-muted-foreground">
                <p>No se seleccionaron productos</p>
                <p className="text-sm">Los productos pueden agregarse después de crear la orden</p>
            </div>
        )}
    </React.Fragment>
}

const BottomActions = ({onOpenChange}: { onOpenChange: (open: boolean) => void }) => {

    const setStep = useOrderStore(state => state.setStep);

    const {customerId, salesRepId, requiredDate, comments, selectedProducts} = useOrderStore(state => state);

    const handleSubmit = async () => {

        const orderCreatedData = {
            customerNumber: parseInt(customerId || "0"),
            requiredDate: requiredDate?.toISOString() || new Date().toISOString(),
            comments: comments || "",
            salesRepEmployeeNumber: parseInt(salesRepId || "0"),
        }

        const products = Object.values(selectedProducts);

        const orderNumber = await createOrder(orderCreatedData);

        if (products.length != 0) {
            await createOrderDetailsBulk(orderNumber, products)
        }

        toast.success("Orden creada exitosamente");
        // esperar 2 segundos y cerrar el modal
        setTimeout(() => {
            onOpenChange(false);
        }, 1000);

    }

    return <React.Fragment>
        <div className="flex justify-between sticky bottom-0 bg-white mt-4 border-t py-6">
            <Button type="button" variant="outline" onClick={() => setStep(2)}>
                <ChevronLeft className="mr-2 h-4 w-4"/> Atrás
            </Button>
            <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancelar
                </Button>
                <Button type="button" onClick={handleSubmit}>
                    <Check className="mr-2 h-4 w-4"/> Crear Orden
                </Button>
            </div>
        </div>
    </React.Fragment>
}