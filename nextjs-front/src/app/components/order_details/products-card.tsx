import React from "react";

interface Product {
  codigo: string;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

export default function Products() {
  const products: Product[] = [
    { codigo: "S18_1749", nombre: "1917 Grand Touring Sedan", precio: 86.7, cantidad: 33, subtotal: 2861.1 },
    { codigo: "S18_2248", nombre: "1911 Ford Town Car", precio: 33.3, cantidad: 43, subtotal: 1431.9 },
    { codigo: "S18_4409", nombre: "1932 Alfa Romeo 8C2300 Spider Tour", precio: 43.26, cantidad: 33, subtotal: 1427.58 },
    { codigo: "S24_3969", nombre: "1936 Mercedes Benz 500k Roadster", precio: 21.75, cantidad: 26, subtotal: 565.5 },
    { codigo: "S24_4258", nombre: "1936 Chrysler Airflow", precio: 57.46, cantidad: 28, subtotal: 1608.88 },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div>
            <h2 className="text-xl font-semibold">Productos</h2>
            <p className="text-sm text-default-500">Detalle de productos en la orden</p>
          </div>
        </CardHeader>
        <CardBody>
          <Table 
            removeWrapper 
            aria-label="Productos en la orden"
          >
            <TableHeader>
              <TableColumn>Código</TableColumn>
              <TableColumn>Nombre del Producto</TableColumn>
              <TableColumn className="text-right">Precio Unitario</TableColumn>
              <TableColumn className="text-right">Cantidad</TableColumn>
              <TableColumn className="text-right">Subtotal</TableColumn>
            </TableHeader>
            <TableBody>
              <>
                {products.map((product) => (
                  <TableRow key={product.codigo}>
                    <TableCell>{product.codigo}</TableCell>
                    <TableCell>{product.nombre}</TableCell>
                    <TableCell className="text-right">{product.precio}</TableCell>
                    <TableCell className="text-right">{product.cantidad}</TableCell>
                    <TableCell className="text-right">{product.subtotal}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="border-t" colSpan={4} children={undefined}></TableCell>
                  <TableCell className="border-t text-right font-medium">
                    Total: 7894,96 €
                  </TableCell>
                </TableRow>
              </>
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}