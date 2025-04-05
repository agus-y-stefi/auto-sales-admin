export interface Order {
  orderNumber: number
  orderDate: string
  customerName: string
  status: string
  total: number
}

export const orders: Order[] = [
  {
    orderNumber: 10101,
    orderDate: "2003-01-09",
    customerName: "Alice Johnson",
    status: "completed",
    total: 250.0,
  },
];

