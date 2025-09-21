import React from "react";

export default function SalesRepEmployeeCard() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div>
            <h2 className="text-xl font-semibold">Representante de Ventas</h2>
            <p className="text-sm text-default-500">Información del representante asignado</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          <div>
            <p className="text-sm text-default-500">Nombre</p>
            <p className="font-medium">Leslie Jennings</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-default-500">Cargo</p>
              <p className="font-medium">Sales Rep</p>
            </div>
            <div>
              <p className="text-sm text-default-500">Email</p>
              <p className="font-medium">ljennings@example.com</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-default-500">Extensión</p>
            <p className="font-medium">x3223</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}