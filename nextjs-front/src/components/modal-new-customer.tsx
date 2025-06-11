"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Select,
    SelectItem,
    Textarea,
} from "@heroui/react";
import { JSX, SVGProps } from "react";

export const PhoneIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
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
                d="M17.45 22.75C16.32 22.75 15.13 22.48 13.9 21.96C12.7 21.44 11.49 20.73 10.31 19.83C9.13 18.93 7.99 17.89 6.91 16.73C5.83 15.57 4.86 14.36 4.01 13.11C3.15 11.86 2.47 10.61 1.99 9.36C1.51 8.12 1.25 6.93 1.25 5.8C1.25 4.97 1.39 4.2 1.68 3.51C1.97 2.81 2.41 2.19 3.01 1.66C3.74 1 4.58 0.65 5.5 0.65C5.94 0.65 6.38 0.75 6.77 0.95C7.18 1.16 7.54 1.47 7.82 1.89L10.28 5.5C10.55 5.89 10.75 6.25 10.89 6.59C11.03 6.91 11.11 7.23 11.11 7.53C11.11 7.92 11 8.29 10.79 8.64C10.59 8.98 10.31 9.34 9.94 9.7L9.29 10.38C9.39 10.55 9.51 10.73 9.67 10.93C9.86 11.18 10.1 11.47 10.41 11.79C10.73 12.11 11.06 12.42 11.38 12.7C11.7 12.98 12 13.21 12.28 13.4C12.54 13.57 12.74 13.68 12.9 13.76L12.87 14.45C12.83 14.84 12.9 15.2 13.09 15.53C13.28 15.86 13.53 16.16 13.86 16.43L17.52 19.2C17.92 19.5 18.35 19.67 18.8 19.67C19.08 19.67 19.39 19.59 19.73 19.43C20.07 19.27 20.43 19.06 20.82 18.79C21.25 18.47 21.57 18.11 21.77 17.71C21.98 17.3 22.08 16.91 22.08 16.53C22.08 16.23 22 15.91 21.84 15.58C21.68 15.24 21.47 14.9 21.19 14.56L17.65 11.13C17.24 10.8 16.79 10.62 16.32 10.62C15.85 10.62 15.42 10.79 15.05 11.13L14.32 11.84C13.96 12.19 13.59 12.46 13.22 12.65C12.86 12.84 12.5 12.94 12.14 12.94C11.83 12.94 11.51 12.86 11.19 12.71C10.86 12.56 10.52 12.35 10.17 12.08L6.62 8.57C6.35 8.22 6.16 7.88 6.05 7.55C5.94 7.21 5.91 6.9 5.96 6.61C6.01 6.32 6.14 6.04 6.36 5.78C6.58 5.52 6.87 5.26 7.23 5.01L7.95 4.42C8.3 4.14 8.48 3.8 8.48 3.42C8.48 3.19 8.42 2.97 8.31 2.76C8.19 2.53 8.03 2.3 7.81 2.06L5.44 -0.89C5.16 -1.23 4.83 -1.49 4.46 -1.67C4.09 -1.85 3.7 -1.95 3.31 -1.95C2.73 -1.95 2.2 -1.77 1.73 -1.41C1.29 -1.08 0.92 -0.68 0.63 -0.22C0.34 0.25 0.13 0.76 0.01 1.32C-0.11 1.87 -0.17 2.43 -0.17 3C-0.17 4.25 0.12 5.56 0.65 6.92C1.18 8.28 1.91 9.65 2.85 11.04C3.79 12.43 4.89 13.77 6.16 15.06C7.43 16.35 8.77 17.47 10.17 18.43C11.56 19.38 12.93 20.13 14.29 20.67C15.65 21.21 16.96 21.48 18.21 21.48C18.82 21.48 19.39 21.42 19.92 21.3C20.45 21.18 20.95 20.97 21.41 20.67C21.87 20.37 22.27 20 22.6 19.56C22.96 19.09 23.14 18.56 23.14 17.98C23.14 17.59 23.04 17.21 22.85 16.83C22.67 16.46 22.41 16.13 22.07 15.85L17.45 22.75Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const LocationIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
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
                d="M12 13.43C13.7231 13.43 15.12 12.0331 15.12 10.31C15.12 8.58687 13.7231 7.19 12 7.19C10.2769 7.19 8.88 8.58687 8.88 10.31C8.88 12.0331 10.2769 13.43 12 13.43Z"
                fill="currentColor"
            />
            <path
                d="M12 22C14.97 22 17.34 20.75 19.11 18.5C20.88 16.26 22 13.28 22 10.14C22 5.69 17.52 2 12 2C6.48 2 2 5.69 2 10.14C2 13.28 3.12 16.26 4.89 18.5C6.66 20.75 9.03 22 12 22ZM12 4C16.41 4 20 6.83 20 10.14C20 12.63 19.11 15.04 17.65 16.86C16.2 18.68 14.29 19.85 12 19.85C9.71 19.85 7.8 18.68 6.35 16.86C4.89 15.04 4 12.63 4 10.14C4 6.83 7.59 4 12 4Z"
                fill="currentColor"
            />
        </svg>
    );
};

interface ModalNewCustomerProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

export function ModalNewCustomer({ isOpen, onOpenChange }: ModalNewCustomerProps) {
    return (
        <>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Nuevo Cliente</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Nombre del Cliente"
                                    placeholder="Ingrese nombre del cliente"
                                    variant="bordered"
                                />
                                <div className="flex gap-2">
                                    <Input
                                        label="Nombre de Contacto"
                                        placeholder="Nombre"
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Apellido de Contacto"
                                        placeholder="Apellido"
                                        variant="bordered"
                                    />
                                </div>
                                <Input
                                    label="Teléfono"
                                    placeholder="Ingrese número de teléfono"
                                    variant="bordered"
                                    startContent={<PhoneIcon className="text-default-400" />}
                                />
                                <Input
                                    label="Dirección"
                                    placeholder="Ingrese dirección"
                                    variant="bordered"
                                    startContent={<LocationIcon className="text-default-400" />}
                                />
                                <div className="flex gap-2">
                                    <Input
                                        label="Ciudad"
                                        placeholder="Ciudad"
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Código Postal"
                                        placeholder="Código Postal"
                                        variant="bordered"
                                    />
                                </div>
                                <Select
                                    label="País"
                                    placeholder="Seleccione un país"
                                    variant="bordered"
                                >
                                    <SelectItem key="spain" id="spain">España</SelectItem>
                                    <SelectItem key="france" id="france">Francia</SelectItem>
                                    <SelectItem key="germany" id="germany">Alemania</SelectItem>
                                    <SelectItem key="italy" id="italy">Italia</SelectItem>
                                    <SelectItem key="portugal" id="portugal">Portugal</SelectItem>
                                </Select>
                                <Input
                                    type="number"
                                    label="Límite de Crédito"
                                    placeholder="Ingrese límite de crédito"
                                    variant="bordered"
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">€</span>
                                        </div>
                                    }
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