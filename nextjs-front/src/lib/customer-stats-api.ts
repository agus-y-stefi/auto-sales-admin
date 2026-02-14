import { getCustomerOrdersInfo } from "@/contracts/orders-service/api";
import type { CustomersStatsDTO } from "@/contracts/product-service/models";

export async function getCustomerStats(customerId: number): Promise<CustomersStatsDTO | null> {
    try {
        const response = await getCustomerOrdersInfo(customerId, { cache: "no-store" });

        if (response.status !== 200) {
            return null;
        }

        return response.data as unknown as CustomersStatsDTO;
    } catch (error) {
        console.error("Error fetching customer stats", { customerId, error });
        return null;
    }
}
