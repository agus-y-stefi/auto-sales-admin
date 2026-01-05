import {
    CustomersStatsDTO,
    ProductDTO,
    TopProductCustomerDTO,
} from "@/clients";
import { ICustomersStats, ITopProduct } from "@/contracts";

export const toICustomersStats = (
    customersStatsDTO: CustomersStatsDTO
): ICustomersStats => {
    return {
        cantidadOrdenes: customersStatsDTO.cantidadOrdenes || 0,
        ordenesCompletadas: customersStatsDTO.ordenesCompletadas || 0,
        precioPromedio: customersStatsDTO.precioPromedio || 0,
        totalOrden: customersStatsDTO.totalOrden || 0,
        totalPagado: customersStatsDTO.totalPagado || 0,
        ultimaOrdenFecha: customersStatsDTO.ultimaOrdenFecha || "",
    };
};

export const toITopProduct = (
    productsDTO: TopProductCustomerDTO[]
): ITopProduct[] => {
    return productsDTO.map((productDTO) => ({
        msrp: productDTO.msrp || 0,
        productCode: productDTO.productCode || "",
        productDescription: productDTO.productDescription || "",
        productName: productDTO.productName || "",
        quantityInStock: productDTO.quantityInStock || 0,
        cantidadComprada: productDTO.cantidadComprada || 0,
    }));
};
