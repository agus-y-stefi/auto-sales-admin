/*
export interface UserType {
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
  orderDate: string
  requiredDate: string
  shippedDate?: string
  status: string
  comments?: string
  customerNumber: number
  [key: string]: any
}

export interface Customer {
  customerNumber: number
  customerName: string
  contactLastName: string
  contactFirstName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state?: string
  postalCode?: string
  country: string
  salesRepEmployeeNumber?: number
  creditLimit?: number
}

