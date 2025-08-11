import React from "react";
import { Card, CardHeader, CardBody, Chip } from "@heroui/react";

export default function OrderCard() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div>
            <h2 className="text-xl font-semibold">Información de la Orden</h2>
            <p className="text-sm text-default-500">Detalles de la orden #10426</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-default-500">Fecha de Orden</p>
              <p className="font-medium">14/5/2023</p>
            </div>
            <div>
              <p className="text-sm text-default-500">Estado</p>
              <Chip
                color="success"
                variant="flat"
                size="sm"
                className="mt-1"
              >
                Enviado
              </Chip>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-default-500">Fecha Requerida</p>
              <p className="font-medium">19/5/2023</p>
            </div>
            <div>
              <p className="text-sm text-default-500">Fecha de Envío</p>
              <p className="font-medium">16/5/2023</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-default-500">Comentarios</p>
            <p className="font-medium">El cliente solicitó entrega en horario de mañana</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}