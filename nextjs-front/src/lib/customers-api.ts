import { mockCustomers } from "@/lib/mock-customers";
import { Customer, PaginatedResponse } from "@/types/customer";

interface GetCustomersParams {
    page?: number;
    size?: number;
    q?: string;
    status?: string;
}

export async function getCustomers({
    page = 1,
    size = 10,
    q = "",
    status = "all",
}: GetCustomersParams): Promise<PaginatedResponse<Customer>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredData = [...mockCustomers];

    // Filter by status
    if (status !== "all") {
        filteredData = filteredData.filter((customer) => customer.status === status);
    }

    // Filter by search query
    if (q) {
        const query = q.toLowerCase();
        filteredData = filteredData.filter(
            (customer) =>
                customer.companyName.toLowerCase().includes(query) ||
                customer.contactFirstName.toLowerCase().includes(query) ||
                customer.contactLastName.toLowerCase().includes(query) ||
                String(customer.customerId).includes(query),
        );
    }

    // Pagination
    const totalElements = filteredData.length;
    const totalPages = Math.ceil(totalElements / size);
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const content = filteredData.slice(startIndex, endIndex);

    return {
        content,
        totalElements,
        totalPages,
        page,
        size,
    };
}
