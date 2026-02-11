export interface Customer {
    customerId: number;
    companyName: string;
    companyType: string | null;
    contactLastName: string;
    contactFirstName: string;
    contactRole: string | null;
    phone: string | null;
    city: string | null;
    country: string | null;
    creditLimit: number | null;
    status: "Active" | "Inactive" | "Pending";
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}
