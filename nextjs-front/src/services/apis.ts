import type { Customer, Order, OrderDetail, Product, Payment, PaginatedResponse } from "@/types"

// URL base de la API de Spring Boot
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// Función auxiliar para manejar errores
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.message || `Error: ${response.status}`)
  }
  return response.json()
}

// Servicios para Clientes
export const customerService = {
  getAll: async (page = 0, size = 10): Promise<PaginatedResponse<Customer>> => {
    const response = await fetch(`${API_BASE_URL}/customers?page=${page}&size=${size}`)
    return handleResponse(response)
  },

  getById: async (customerNumber: number): Promise<Customer> => {
    const response = await fetch(`${API_BASE_URL}/customers/${customerNumber}`)
    return handleResponse(response)
  },

  create: async (customer: Omit<Customer, "customerNumber">): Promise<Customer> => {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
    return handleResponse(response)
  },

  update: async (customerNumber: number, customer: Partial<Customer>): Promise<Customer> => {
    const response = await fetch(`${API_BASE_URL}/customers/${customerNumber}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
    return handleResponse(response)
  },

  delete: async (customerNumber: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/customers/${customerNumber}`, {
      method: "DELETE",
    })
    return handleResponse(response)
  },

  getPayments: async (customerNumber: number): Promise<Payment[]> => {
    const response = await fetch(`${API_BASE_URL}/customers/${customerNumber}/payments`)
    return handleResponse(response)
  },
}

// Servicios para Órdenes
export const orderService = {
  getAll: async (page = 0, size = 10): Promise<PaginatedResponse<Order>> => {
    const response = await fetch(`${API_BASE_URL}/orders?page=${page}&size=${size}`)
    return handleResponse(response)
  },

  getById: async (orderNumber: number): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderNumber}`)
    return handleResponse(response)
  },

  create: async (order: Omit<Order, "orderNumber">): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
    return handleResponse(response)
  },

  update: async (orderNumber: number, order: Partial<Order>): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderNumber}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
    return handleResponse(response)
  },

  delete: async (orderNumber: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderNumber}`, {
      method: "DELETE",
    })
    return handleResponse(response)
  },

  getOrderDetails: async (orderNumber: number): Promise<OrderDetail[]> => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderNumber}/details`)
    return handleResponse(response)
  },
}

// Servicios para Productos
export const productService = {
  getAll: async (page = 0, size = 10): Promise<PaginatedResponse<Product>> => {
    const response = await fetch(`${API_BASE_URL}/products?page=${page}&size=${size}`)
    return handleResponse(response)
  },

  getById: async (productCode: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${productCode}`)
    return handleResponse(response)
  },

  create: async (product: Product): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
    return handleResponse(response)
  },

  update: async (productCode: string, product: Partial<Product>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${productCode}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
    return handleResponse(response)
  },

  delete: async (productCode: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${productCode}`, {
      method: "DELETE",
    })
    return handleResponse(response)
  },
}

