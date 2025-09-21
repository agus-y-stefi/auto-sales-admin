"use client";

import { JSX, SVGProps } from "react";

export const TagIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M10.4 3H5.6C4.17 3 3 4.17 3 5.6V10.4C3 11.17 3.29 11.92 3.81 12.43L9.82 18.44C10.93 19.55 12.77 19.55 13.88 18.44L18.44 13.88C19.55 12.77 19.55 10.93 18.44 9.82L12.43 3.81C11.92 3.29 11.17 3 10.4 3ZM7.5 9C6.67 9 6 8.33 6 7.5C6 6.67 6.67 6 7.5 6C8.33 6 9 6.67 9 7.5C9 8.33 8.33 9 7.5 9Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const BoxIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M3.17 7.44L12 12.55L20.77 7.47"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
            <path
                d="M12 21.61V12.54"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
            <path
                d="M21.61 12.83V9.17C21.61 7.79 20.66 6.11 19.41 5.44L14.07 2.48C12.93 1.84 11.07 1.84 9.93 2.48L4.59 5.44C3.34 6.11 2.39 7.79 2.39 9.17V14.83C2.39 16.21 3.34 17.89 4.59 18.56L9.93 21.52C10.5 21.84 11.25 22 12 22C12.75 22 13.5 21.84 14.07 21.52"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </svg>
    );
};

interface ModalNewProductProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onProductCreated?: (product: any) => void;
}

export function ModalNewProduct({ isOpen, onOpenChange, onProductCreated }: ModalNewProductProps) {
    return (
        <>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Nuevo Producto</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Código de Producto"
                                    placeholder="Ingrese código de producto"
                                    variant="bordered"
                                />
                                <Input
                                    label="Nombre de Producto"
                                    placeholder="Ingrese nombre de producto"
                                    variant="bordered"
                                />
                                <Select
                                    label="Línea de Producto"
                                    placeholder="Seleccione una línea"
                                    variant="bordered"
                                >
                                    <SelectItem key="classic-cars" id="classic-cars">Classic Cars</SelectItem>
                                    <SelectItem key="motorcycles" id="motorcycles">Motorcycles</SelectItem>
                                    <SelectItem key="planes" id="planes">Planes</SelectItem>
                                    <SelectItem key="ships" id="ships">Ships</SelectItem>
                                    <SelectItem key="trains" id="trains">Trains</SelectItem>
                                    <SelectItem key="trucks-buses" id="trucks-buses">Trucks and Buses</SelectItem>
                                    <SelectItem key="vintage-cars" id="vintage-cars">Vintage Cars</SelectItem>
                                </Select>
                                <Input
                                    label="Proveedor"
                                    placeholder="Ingrese proveedor"
                                    variant="bordered"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        label="Cantidad en Stock"
                                        placeholder="Ingrese cantidad"
                                        type="number"
                                        variant="bordered"
                                    />
                                    <Select
                                        label="Estado"
                                        placeholder="Seleccione estado"
                                        variant="bordered"
                                    >
                                        <SelectItem key="inStock" id="inStock">En stock</SelectItem>
                                        <SelectItem key="lowStock" id="lowStock">Stock bajo</SelectItem>
                                        <SelectItem key="outOfStock" id="outOfStock">Sin stock</SelectItem>
                                        <SelectItem key="discontinued" id="discontinued">Descontinuado</SelectItem>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        label="Precio de Compra"
                                        placeholder="Ingrese precio de compra"
                                        type="number"
                                        variant="bordered"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">€</span>
                                            </div>
                                        }
                                    />
                                    <Input
                                        label="MSRP"
                                        placeholder="Ingrese precio de venta"
                                        type="number"
                                        variant="bordered"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">€</span>
                                            </div>
                                        }
                                    />
                                </div>
                                <Textarea
                                    label="Descripción"
                                    placeholder="Ingrese descripción del producto"
                                    variant="bordered"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Crear
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}