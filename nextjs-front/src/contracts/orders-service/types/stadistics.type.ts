export interface ICustomersStats {
    cantidadOrdenes: number;
    ordenesCompletadas: number;
    precioPromedio: number;
    totalOrden: number;
    totalPagado: number;
    ultimaOrdenFecha: string;
}

export interface ITopProduct {
    productCode: string;
    productName: string;
    productDescription: string;
    quantityInStock: number;
    msrp: number;
    cantidadComprada: number;
}