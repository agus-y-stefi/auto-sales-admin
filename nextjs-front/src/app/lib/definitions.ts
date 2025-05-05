export interface Page<T> {
    content: T[];          // Lista de elementos de tipo T
    totalElements: number; // Total de elementos en la base de datos
    totalPages: number;    // Número total de páginas
    number: number;        // Página actual (0-based)
    size: number;          // Tamaño de la página
}

export interface FormattedOrderTableHome {
    orderNumber: number
    orderDate: string
    status: string
    customerName: string
    total: number
}


// TODO: Endpoints

export const URL_MS_ORDERS = "http://localhost:8082";

export const URL_ORDERS = URL_MS_ORDERS + "/orders";

