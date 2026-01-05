import {CustomersStatsDTO} from "@/clients";
import { ICustomersStats } from "@/contracts";

export const toICustomersStats = (customersStatsDTO : CustomersStatsDTO): ICustomersStats => {
    return {
        cantidadOrdenes: customersStatsDTO.cantidadOrdenes || 0,
        ordenesCompletadas: customersStatsDTO.ordenesCompletadas || 0,
        precioPromedio: customersStatsDTO.precioPromedio || 0,
        totalOrden: customersStatsDTO.totalOrden || 0,
        totalPagado: customersStatsDTO.totalPagado || 0,
        ultimaOrdenFecha: customersStatsDTO.ultimaOrdenFecha || "",
    }
}
