import {FormattedOrderTableHome} from "@/app/lib/definitions";

export const orders: FormattedOrderTableHome[] = [
  {
    orderNumber: 10101,
    orderDate: "2023-01-09",
    customerName: "Alice Johnson", // TODO: De la tabla customers usando un JOIN
    status: "Enviado",
    total: 250.0,
  },
  {
    orderNumber: 10102,
    orderDate: "2024-03-11",
    customerName: "Brian Smith",
    status: "Pendiente",
    total: 150.5,
  },
  {
    orderNumber: 10105,
    orderDate: "2024-03-15",
    customerName: "Catherine Lee",
    status: "Cancelado",
    total: 320.0,
  },
  {
    orderNumber: 10109,
    orderDate: "2024-03-12",
    customerName: "Lucía González",
    status: "Devuelto",
    total: 89.99,
  },
  {
    orderNumber: 10104,
    orderDate: "2024-03-13",
    customerName: "Javier Pérez",
    status: "Reembolsado",
    total: 120.75,
  },  
  {
    orderNumber: 10111,
    orderDate: "2024-03-20",
    customerName: "David Brown",
    status: "En proceso",
    total: 89.99,
  },
  {
    orderNumber: 10103,
    orderDate: "2024-03-22",
    customerName: "Emma Wilson",
    status: "Enviado",
    total: 475.75,
  },
  {
    orderNumber: 10106,
    orderDate: "2024-03-25",
    customerName: "Frank Thompson",
    status: "En proceso",
    total: 199.99,
  },
  {
    orderNumber: 10107,
    orderDate: "2024-03-28",
    customerName: "Grace Martinez",
    status: "Pendiente",
    total: 134.45,
  },
  {
    orderNumber: 10108,
    orderDate: "2024-03-30",
    customerName: "Henry Clark",
    status: "Enviado",
    total: 289.99,
  },
  {orderNumber: 10114,
  orderDate: "2024-03-30",
  customerName: "Henry Clark",
  status: "Entregado",
  total: 289.99,
}
];

