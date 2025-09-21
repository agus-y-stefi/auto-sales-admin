"use client";

import {FormEvent, JSX, SVGProps} from "react";
import {customerCreateFormDataTransform} from "@/app/lib/utils/form_data_transform";
import {createCustomers} from "@/contracts";
import {MapPin, PhoneIcon} from "lucide-react";
import {redirect} from "next/navigation";

interface ModalNewCustomerProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

const crearClienteHandler = async (e: FormData) => {
    try {
        await createCustomers(customerCreateFormDataTransform(e));
    } catch (e) {
        console.log("Error creating customer");
    }

    const searchParams = new URLSearchParams(window.location.search).toString();
    redirect(`/customers${searchParams ? `?${searchParams}` : ''}`);
}

export function ModalNewCustomer({isOpen, onOpenChange}: ModalNewCustomerProps) {
    return (
        <>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Nuevo Cliente</ModalHeader>
                            <ModalBody>
                                <form id={"new-customer-form"} action={crearClienteHandler} /*onSubmit={() => onClose()}*/ className={"flex flex-col gap-2"}>
                                    <Input
                                        name="nombreCliente"
                                        label="Nombre del Cliente"
                                        placeholder="Ingrese nombre del cliente"
                                        variant="bordered"
                                    />
                                    <div className="flex gap-2">
                                        <Input name="nombreContacto" label="Nombre de Contacto" placeholder="Nombre" variant="bordered"/>
                                        <Input name="apellidoContacto" label="Apellido de Contacto" placeholder="Apellido" variant="bordered"/>
                                    </div>
                                    <Input
                                        name="telefono"
                                        label="Teléfono"
                                        placeholder="Ingrese número de teléfono"
                                        variant="bordered"
                                        startContent={<PhoneIcon className="text-default-400" size={18}/>}
                                    />
                                    <Input
                                        name="direccion"
                                        label="Dirección"
                                        placeholder="Ingrese dirección"
                                        variant="bordered"
                                        startContent={<MapPin className="text-default-400" size={18}/>}
                                    />
                                    <Input
                                        name="ciudad"
                                        label="Ciudad"
                                        placeholder="Ciudad"
                                        variant="bordered"
                                    />
                                    <Select name="pais" label="País" placeholder="Seleccione un país" variant="bordered">
                                        <SelectItem key="España">España</SelectItem>
                                        <SelectItem key="Fracia">Francia</SelectItem>
                                        <SelectItem key="Alemania">Alemania</SelectItem>
                                        <SelectItem key="Italia">Italia</SelectItem>
                                        <SelectItem key="Portugal">Portugal</SelectItem>
                                    </Select>
                                    <Input
                                        type="number"
                                        name="limiteCredito"
                                        label="Límite de Crédito"
                                        placeholder="Ingrese límite de crédito"
                                        variant="bordered"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">€</span>
                                            </div>
                                        }
                                    />

                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" type="button" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" type="submit" form={"new-customer-form"}>
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