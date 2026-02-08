import React from "react";
import { IPage, IProduct, IProductTableHome } from "@/contracts";
import { TableProvider } from "../table-provider";
import { columnsProductsTableHome } from "@/lib/config/tables/product-home.config";
import { TableCell, TableRow } from "../ui/table";
import { TableTopProductsContent } from "./table-top-products";
import { ClearableInput } from "../ui/clearable-input";
import { NewProductModal } from "./new/new-product-modal";

export const ProductsTableHome = ({
    productsPage,
}: {
    productsPage: IPage<IProductTableHome>;
}) => {
    const products = productsPage.content;

    return (
        <React.Fragment>
            <div className="space-y-4">
                <div className="flex justify-between gap-3 items-end">
                    <div className="flex gap-3">
                        <ClearableInput />
                    </div>
                    <div className="flex gap-3">
                        <NewProductModal />
                    </div>
                </div>
                <TableProvider
                    columns={columnsProductsTableHome}
                    pages={productsPage.metadata.totalPages || 1}
                >
                    {products.length === 0 ? (
                        <div className="text-center py-8">
                            No se encontraron productos
                        </div>
                    ) : (
                        products.map((product) => (
                            <RowsTable
                                key={product.productCode}
                                product={product}
                            />
                        ))
                    )}
                </TableProvider>
            </div>
        </React.Fragment>
    );
};

const RowsTable = ({ product }: { product: IProductTableHome }) => {
    return (
        <React.Fragment>
            <TableRow key={product.productCode}>
                <TableCell key={"productCode"}>
                    <span className="text-muted-foreground font-medium">
                        {product.productCode}
                    </span>
                </TableCell>
                <TableCell key={"productName"}>
                    <span className="text-foreground">
                        {product.productName}
                    </span>
                </TableCell>
                <TableCell key={"productLine"}>
                    <span className="text-foreground">
                        {product.productLine}
                    </span>
                </TableCell>
                <TableCell key={"productVendor"}>
                    <span className="text-foreground">
                        {product.productVendor}
                    </span>
                </TableCell>
                <TableCell key={"status"}>
                    <span className="text-foreground">
                        {product.quantityInStock > 20
                            ? "In Stock"
                            : product.quantityInStock > 5
                            ? "Low"
                            : product.quantityInStock > 0
                            ? "Critical"
                            : "Out of Stock"}
                    </span>
                </TableCell>
                <TableCell key={"buyPrice"}>
                    <span className="text-foreground">{product.buyPrice}</span>
                </TableCell>
                <TableCell key={"MSRP"}>
                    <span className="text-foreground">{product.MSRP}</span>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};
