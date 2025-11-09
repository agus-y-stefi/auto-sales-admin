"use client";
import {Table, TableHeader, TableRow, TableBody, TableHead, TableCell } from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import React, {useEffect, useState} from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {formatCurrency} from "@/lib/format";

import {IProduct, IPage, IProductTableNewOrder, getProductsNewOrderTable, DEFAULT_PAGE_NULL,} from "@/contracts"
import {useOrderStore} from "@/stores";
import {useDebounce} from "use-debounce";
import {ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SecondStep = ( ) =>{

    const [products, setProducts] = useState<IPage<IProductTableNewOrder>>(DEFAULT_PAGE_NULL);

    const [searchTerm, setSearchTerm] = useState("");

    // 🔹 debounce evita llamadas continuas al backend
    const [debouncedSearch] = useDebounce(searchTerm, 400);

    useEffect(() => {
        getProductsNewOrderTable(debouncedSearch).then(setProducts);
    }, [debouncedSearch]);

    const toggleProduct = useOrderStore(state => state.toggleProduct);
    const selectedProducts = useOrderStore(state => state.selectedProducts);
    const updateProductQuantity = useOrderStore(state => state.updateProductQuantity);
    const countSelectedProducts = useOrderStore(state => state.countSelectedProducts);
    const clearProducts = useOrderStore(state => state.clearProducts);
    const setStep = useOrderStore(state => state.setStep);

    return <React.Fragment>
        <div className="flex flex-col gap-2 py-4">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Buscar productos..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="rounded-md border max-h-[400px] overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead>Producto</TableHead>
                            <TableHead>Línea</TableHead>
                            <TableHead className="text-right">Stock</TableHead>
                            <TableHead className="text-right">Cantidad</TableHead>
                            <TableHead className="text-right">Precio</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.content.map((product) => {
                            const isSelected = product.productCode in selectedProducts;
                            const selectedProduct = selectedProducts[product.productCode];

                            return (
                                <TableRow key={product.productCode}>
                                    <TableCell>
                                        <Checkbox checked={isSelected} onCheckedChange={() => toggleProduct(product)} />
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">{product.productCode}</TableCell>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{product.productLine}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{product.quantityInStock}</TableCell>
                                    <TableCell className="text-right">
                                        {isSelected ? (
                                            <Input
                                                type="number"
                                                min="1"
                                                max={product.quantityInStock}
                                                value={selectedProduct?.quantity || 1}
                                                onChange={(e) =>
                                                    updateProductQuantity(product.productCode, Number.parseInt(e.target.value) || 1)
                                                }
                                                className="w-20 text-right"
                                            />
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className="text-muted-foreground">{formatCurrency(product.MSRP)}</span>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between items-center pt-4">
                <p className="text-sm text-muted-foreground">{countSelectedProducts} producto(s) seleccionado(s)</p>
                <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => {setStep(1)}}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Atrás
                    </Button>
                    <Button type="button" variant="outline" onClick={()=>{
                        clearProducts();
                        setStep(3);
                    }}>
                        Omitir
                    </Button>
                    <Button type="button" onClick={()=>{setStep(3)}}>
                        Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    </React.Fragment>
}