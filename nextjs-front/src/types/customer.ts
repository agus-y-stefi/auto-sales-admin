export interface Customer {
    customerNumber: number;
    customerName: string;
    contactLastName: string;
    contactFirstName: string;
    phone: string | null;
    city: string | null;
    country: string | null;
    creditLimit: number | null;
    status: string;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
    hasNext: boolean;
    hasPrev: boolean;
}
