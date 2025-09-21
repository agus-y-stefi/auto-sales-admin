import React from "react";

export default function CustomerCard() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div>
            <h2 className="text-xl font-semibold">Cliente</h2>
            <p className="text-sm text-default-500">Información del cliente</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          <div>
            <p className="text-sm text-default-500">Nombre</p>
            <p className="font-medium">Mini Gifts Distributors Ltd.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-default-500">Contacto</p>
              <p className="font-medium">Susan Nelson</p>
            </div>
            <div>
              <p className="text-sm text-default-500">Teléfono</p>
              <p className="font-medium">+1 415-555-1450</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-default-500">Límite de Crédito</p>
            <p className="font-medium">210.500,00 €</p>
          </div>

          <div>
            <p className="text-sm text-default-500">Dirección</p>
            <div className="font-medium">
              <p>5677 Strong St.</p>
              <p>San Rafael, CA 97562</p>
              <p>USA</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}