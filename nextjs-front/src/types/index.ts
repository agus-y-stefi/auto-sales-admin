// Interfaces basadas en el esquema de la base de datos classicmodels

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
  
  export interface Order {
    orderNumber: number
    orderDate: string
    requiredDate: string
    shippedDate?: string
    status: string
    comments?: string
    customerNumber: number
  }
  
  export interface OrderDetail {
    orderNumber: number
    productCode: string
    quantityOrdered: number
    priceEach: number
    orderLineNumber: number
  }
  
  export interface Product {
    productCode: string
    productName: string
    productLine: string
    productScale: string
    productVendor: string
    productDescription: string
    quantityInStock: number
    buyPrice: number
    MSRP: number
  }
  
  export interface ProductLine {
    productLine: string
    textDescription?: string
    htmlDescription?: string
    image?: string
  }
  
  export interface Payment {
    customerNumber: number
    checkNumber: string
    paymentDate: string
    amount: number
  }
  
  export interface Office {
    officeCode: string
    city: string
    phone: string
    addressLine1: string
    addressLine2?: string
    state?: string
    country: string
    postalCode: string
    territory: string
  }
  
  export interface Employee {
    employeeNumber: number
    lastName: string
    firstName: string
    extension: string
    email: string
    officeCode: string
    reportsTo?: number
    jobTitle: string
  }
  
  // Interfaces adicionales para respuestas paginadas
  export interface PaginatedResponse<T> {
    content: T[]
    totalElements: number
    totalPages: number
    size: number
    number: number
    first: boolean
    last: boolean
  }
  
  