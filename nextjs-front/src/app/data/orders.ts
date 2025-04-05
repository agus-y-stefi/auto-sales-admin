import {Order} from "@/app/lib/definitions";

export const orders: Order[] = [
  {
    orderNumber: 10101,
    orderDate: "2003-01-09",
    customerName: "Alice Johnson", // TODO: De la tabla customers usando un JOIN
    status: "completed",
    total: 250.0,
  }
];

