import { CustomersStatsDTO, ProductDTO } from "@/clients";
import { ICustomersStats, IProduct } from "@/contracts";

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

export const toIProducts = (productsDTO: ProductDTO[]): IProduct[] => {
    return productsDTO.map((productDTO) => ({
        buyPrice: productDTO.buyPrice || 0,
        msrp: productDTO.msrp || 0,
        productCode: productDTO.productCode || "",
        productDescription: productDTO.productDescription || "",
        productName: productDTO.productName || "",
        productScale: productDTO.productScale || "",
        productVendor: productDTO.productVendor || "",
        quantityInStock: productDTO.quantityInStock || 0,
        productLine: productDTO.productLine || "",
        productLineDescription: productDTO.productLineDescription || "",
    }));
};
