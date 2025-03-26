import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface OrderDetailsProps {
  orderNumber: string
}

export default function OrderDetails({ orderNumber }: OrderDetailsProps) {
  // Datos de ejemplo
  const orderData = {
    orderNumber: orderNumber,
    orderDate: "2023-05-15",
    requiredDate: "2023-05-20",
    shippedDate: "2023-05-17",
    status: "Enviado",
    comments: "El cliente solicitó entrega en horario de mañana",

    customer: {
      customerNumber: "103",
      customerName: "Mini Gifts Distributors Ltd.",
      contactName: "Susan Nelson",
      phone: "+1 415-555-1450",
      addressLine1: "5677 Strong St.",
      city: "San Rafael",
      state: "CA",
      postalCode: "97562",
      country: "USA",
      creditLimit: 210500.0,
    },

    salesRep: {
      employeeNumber: "1165",
      name: "Leslie Jennings",
      email: "ljennings@example.com",
      extension: "x3223",
      jobTitle: "Sales Rep",
    },

    office: {
      officeCode: "1",
      city: "San Francisco",
      phone: "+1 650-219-4782",
      addressLine1: "100 Market Street",
      addressLine2: "Suite 300",
      state: "CA",
      country: "USA",
      postalCode: "94080",
      territory: "NA",
    },

    products: [
      {
        productCode: "S18_1749",
        productName: "1917 Grand Touring Sedan",
        priceEach: 86.7,
        quantity: 33,
        subtotal: 2861.1,
      },
      {
        productCode: "S18_2248",
        productName: "1911 Ford Town Car",
        priceEach: 33.3,
        quantity: 43,
        subtotal: 1431.9,
      },
      {
        productCode: "S18_4409",
        productName: "1932 Alfa Romeo 8C2300 Spider Tour",
        priceEach: 43.26,
        quantity: 33,
        subtotal: 1427.58,
      },
      {
        productCode: "S24_3969",
        productName: "1936 Mercedes Benz 500k Roadster",
        priceEach: 21.75,
        quantity: 26,
        subtotal: 565.5,
      },
      {
        productCode: "S24_4258",
        productName: "1936 Chrysler Airflow",
        priceEach: 57.46,
        quantity: 28,
        subtotal: 1608.88,
      },
    ],

    totalAmount: 7894.96,
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Enviado":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "En proceso":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80"
      case "Cancelado":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información de la Orden</CardTitle>
            <CardDescription>Detalles de la orden #{orderData.orderNumber}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha de Orden</p>
                  <p>{new Date(orderData.orderDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <Badge variant="outline" className={getStatusColor(orderData.status)}>
                    {orderData.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha Requerida</p>
                  <p>{new Date(orderData.requiredDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha de Envío</p>
                  <p>{orderData.shippedDate ? new Date(orderData.shippedDate).toLocaleDateString() : "Pendiente"}</p>
                </div>
              </div>
              {orderData.comments && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Comentarios</p>
                  <p className="text-sm">{orderData.comments}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cliente</CardTitle>
            <CardDescription>Información del cliente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                <p className="font-medium">{orderData.customer.customerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contacto</p>
                <p>{orderData.customer.contactName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                  <p>{orderData.customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Límite de Crédito</p>
                  <p>{formatCurrency(orderData.customer.creditLimit)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                <p>{orderData.customer.addressLine1}</p>
                <p>
                  {orderData.customer.city}, {orderData.customer.state} {orderData.customer.postalCode}
                </p>
                <p>{orderData.customer.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Representante de Ventas</CardTitle>
            <CardDescription>Información del representante asignado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                <p className="font-medium">{orderData.salesRep.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cargo</p>
                  <p>{orderData.salesRep.jobTitle}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Extensión</p>
                  <p>{orderData.salesRep.extension}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{orderData.salesRep.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Oficina</CardTitle>
            <CardDescription>Información de la oficina</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ubicación</p>
                <p className="font-medium">
                  {orderData.office.city}, {orderData.office.country}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                <p>{orderData.office.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                <p>{orderData.office.addressLine1}</p>
                {orderData.office.addressLine2 && <p>{orderData.office.addressLine2}</p>}
                <p>
                  {orderData.office.city}, {orderData.office.state} {orderData.office.postalCode}
                </p>
                <p>{orderData.office.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Productos</CardTitle>
          <CardDescription>Detalle de productos en la orden</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Código</TableHead>
                <TableHead>Nombre del Producto</TableHead>
                <TableHead className="text-right">Precio Unitario</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData.products.map((product) => (
                <TableRow key={product.productCode}>
                  <TableCell className="font-medium">{product.productCode}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell className="text-right">{formatCurrency(product.priceEach)}</TableCell>
                  <TableCell className="text-right">{product.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(product.subtotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} className="text-right font-medium">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(orderData.totalAmount)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

