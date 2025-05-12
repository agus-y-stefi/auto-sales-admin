import React from "react";
import { Card, CardHeader, CardBody, Chip } from "@heroui/react";

export default function OfficeCard() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div>
            <h2 className="text-xl font-semibold">Oficina</h2>
            <p className="text-sm text-default-500">Información de la oficina</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          <div>
            <p className="text-sm text-default-500">Ubicación</p>
            <p className="font-medium">San Francisco, USA</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-default-500">Teléfono</p>
              <p className="font-medium">+1 650-219-4782</p>
            </div>
            <div>
              <p className="text-sm text-default-500">Dirección</p>
              <p className="font-medium">
                100 Market Street
                Suite 300
                San Francisco, CA 94080 USA</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}