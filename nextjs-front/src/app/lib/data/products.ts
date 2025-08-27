// ESTO DEPENDE DEL BACKEND - Comentar esta línea cuando no haya backend disponible
// const products = await getProducts(page, limit, query);

// DATOS DE EJEMPLO - Usar estos datos cuando no haya backend disponible
import {IPage, IProductTableHome} from "@/contracts";

const mockProducts: IProductTableHome[] = [
    {
        productCode: "S10_1678",
        productName: "1969 Harley Davidson Ultimate Chopper",
        productLine: "Motorcycles",
        productVendor: "Min Lin Diecast",
        quantityInStock: 7933,
        buyPrice: 48.81,
        MSRP: 95.70,
        status: "En stock"
    },
    {
        productCode: "S10_1949",
        productName: "1952 Alpine Renault 1300",
        productLine: "Classic Cars",
        productVendor: "Classic Metal Creations",
        quantityInStock: 7305,
        buyPrice: 98.58,
        MSRP: 214.30,
        status: "En stock"
    },
    {
        productCode: "S10_2016",
        productName: "1996 Moto Guzzi 1100i",
        productLine: "Motorcycles",
        productVendor: "Highway 66 Mini Classics",
        quantityInStock: 6625,
        buyPrice: 68.99,
        MSRP: 118.94,
        status: "Stock bajo"
    },
    {
        productCode: "S10_4698",
        productName: "2003 Harley-Davidson Eagle Drag Bike",
        productLine: "Motorcycles",
        productVendor: "Red Start Diecast",
        quantityInStock: 5582,
        buyPrice: 91.02,
        MSRP: 193.66,
        status: "En stock"
    },
    {
        productCode: "S10_4757",
        productName: "1972 Alfa Romeo GTA",
        productLine: "Classic Cars",
        productVendor: "Motor City Art Classics",
        quantityInStock: 3252,
        buyPrice: 85.68,
        MSRP: 136.00,
        status: "En stock"
    },
    {
        productCode: "S10_4962",
        productName: "1962 LanciaA Delta 16V",
        productLine: "Classic Cars",
        productVendor: "Second Gear Diecast",
        quantityInStock: 6791,
        buyPrice: 103.42,
        MSRP: 147.74,
        status: "En stock"
    },
    {
        productCode: "S12_1099",
        productName: "1968 Ford Mustang",
        productLine: "Classic Cars",
        productVendor: "Autoart Studio Design",
        quantityInStock: 68,
        buyPrice: 95.34,
        MSRP: 194.57,
        status: "Stock bajo"
    },
    {
        productCode: "S12_1108",
        productName: "2001 Ferrari Enzo",
        productLine: "Classic Cars",
        productVendor: "Second Gear Diecast",
        quantityInStock: 3619,
        buyPrice: 95.59,
        MSRP: 207.80,
        status: "En stock"
    },
    {
        productCode: "S12_1666",
        productName: "1958 Setra Bus",
        productLine: "Trucks and Buses",
        productVendor: "Welly Diecast Productions",
        quantityInStock: 1579,
        buyPrice: 77.90,
        MSRP: 136.67,
        status: "En stock"
    },
    {
        productCode: "S12_2823",
        productName: "2002 Suzuki XREO",
        productLine: "Motorcycles",
        productVendor: "Unimax Art Galleries",
        quantityInStock: 9997,
        buyPrice: 66.27,
        MSRP: 150.62,
        status: "En stock"
    }
];

// FUNCIÓN SIMULADA - Reemplaza a getProducts cuando no hay backend
export const getProductsMock = (page: string, limit: string, query: string): IPage<IProductTableHome> => {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;

    // Filtrar por búsqueda si hay query
    let filtered = mockProducts;
    if (query) {
        const searchLower = query.toLowerCase();
        filtered = mockProducts.filter(product =>
            product.productName.toLowerCase().includes(searchLower) ||
            product.productCode.toLowerCase().includes(searchLower)
        );
    }

    // Paginar los resultados
    const paginatedProducts = filtered.slice(start, end);

    return {
        content: paginatedProducts,
        metadata: {
            totalPages: Math.ceil(filtered.length / limitNum),
            totalElements: filtered.length,
            size: limitNum,
            number: pageNum - 1,
        }
    };
};