 /*export interface UserType {
  id: number
  name: string
  role: string
  team: string
  status: string
  age: string
  avatar: string
  email: string
  [key: string]: any
}
*/
export interface Customer {
  customerNumber: number
  name: string
}

export interface Order {
  orderNumber: number
  date: string
  customer: Customer
  status: string
  total: number
}

export const customers: Customer[] = [
  { customerNumber: 1001, name: "Alice Johnson" },
];

export const orders: Order[] = [
  {
    orderNumber: 10101,
    date: "2003-01-09",
    customer: { customerNumber: 1001, name: "Alice Johnson" },
    status: "completed",
    total: 250.0,
  },
];

