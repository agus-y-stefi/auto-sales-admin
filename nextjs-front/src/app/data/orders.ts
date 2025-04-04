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

export interface Order {
  orderNumber: number
  date: string
  customerName: string
  status: string
  total: number
}

export const orders: Order[] = [
  {
    orderNumber: 10101,
    date: "2003-01-09",
    customerName: "Alice Johnson",
    status: "completed",
    total: 250.0,
  },
];

