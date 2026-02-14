import { getAllCustomers, getCustomerById } from "@/contracts/customer-service/api";
import { Customer, PaginatedResponse } from "@/types/customer";
import type { CustomerDto, CustomPagedDTOCustomerDto } from "@/contracts/customer-service/models";

function mapCustomerDtoToCustomer(dto: CustomerDto): Customer {
    return {
        customerNumber: dto.customerNumber,
        customerName: dto.customerName,
        contactFirstName: dto.contactFirstName,
        contactLastName: dto.contactLastName,
        phone: dto.phone?.trim() || null,
        city: dto.city?.trim() || null,
        country: dto.country?.trim() || null,
        creditLimit: dto.creditLimit ?? null,
        status: dto.status,
    };
}

/**
 * Fetches a single customer by ID.
 * Returns null if not found or on error (caller should notFound()).
 */
export async function getCustomer(id: number): Promise<Customer | null> {
    const response = await getCustomerById(id);
    if (response.status === 404 || response.status !== 200) {
        return null;
    }
    const dto = response.data as unknown as CustomerDto;
    return mapCustomerDtoToCustomer(dto);
}

interface GetCustomersParams {
    page?: number;
    size?: number;
    q?: string;
    status?: string;
}

/**
 * Fetches customers from the backend API via Orval-generated client.
 * Handles page indexing: frontend uses 1-based, backend uses 0-based.
 */
export async function getCustomers({
    page = 1,
    size = 10,
    q = "",
    status = "all",
}: GetCustomersParams): Promise<PaginatedResponse<Customer>> {
    const response = await getAllCustomers({
        page: page - 1, // Backend is 0-indexed
        size,
        q: q || undefined, // Don't send empty string
        status: status !== "all" ? [status] : undefined, // Backend expects string[]
    });

    const data = response.data as unknown as CustomPagedDTOCustomerDto;

    return {
        content: (data.content ?? []) as Customer[],
        totalElements: data.totalElements ?? 0,
        totalPages: data.totalPages ?? 0,
        number: data.number ?? 0,
        size: data.size ?? size,
        first: data.first ?? true,
        last: data.last ?? true,
        hasNext: data.hasNext ?? false,
        hasPrev: data.hasPrev ?? false,
    };
}
