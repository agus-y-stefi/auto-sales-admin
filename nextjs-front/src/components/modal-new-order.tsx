"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
} from "@heroui/react";
import { JSX, SVGProps } from "react";
  
// Mantenemos los iconos existentes y agregamos uno nuevo para la fecha
export const CalendarIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
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
        d="M16.75 3.56V2C16.75 1.59 16.41 1.25 16 1.25C15.59 1.25 15.25 1.59 15.25 2V3.5H8.74999V2C8.74999 1.59 8.40999 1.25 7.99999 1.25C7.58999 1.25 7.24999 1.59 7.24999 2V3.56C4.54999 3.81 3.24999 5.42 3.24999 8.44V16.37C3.24999 19.75 4.74999 21.25 8.12999 21.25H15.87C19.25 21.25 20.75 19.75 20.75 16.37V8.44C20.75 5.42 19.45 3.81 16.75 3.56Z"
        fill="currentColor"
      />
    </svg>
  );
};
  
interface ModalNewOrderProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onOrderCreated?: (order: any) => void;
}
  
export function ModalNewOrder({ isOpen, onOpenChange, onOrderCreated }: ModalNewOrderProps) {
  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Nueva Orden</ModalHeader>
              <ModalBody>
                <Select
                  label="Cliente"
                  placeholder="Seleccione un cliente"
                  variant="bordered"
                >
                  <SelectItem key="1" id="1">Cliente 1</SelectItem>
                  <SelectItem key="2" id="2">Cliente 2</SelectItem>
                  <SelectItem key="3" id="3">Cliente 3</SelectItem>
                </Select>
                <Input
                  endContent={
                    <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Fecha de Orden"
                  type="date"
                  variant="bordered"
                />
                <Select
                  label="Estado"
                  placeholder="Seleccione un estado"
                  variant="bordered"
                >
                  <SelectItem key="in-process" id="In Process">En Proceso</SelectItem>
                  <SelectItem key="shipped" id="Shipped">Enviado</SelectItem>
                  <SelectItem key="on-hold" id="On Hold">En Espera</SelectItem>
                </Select>
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