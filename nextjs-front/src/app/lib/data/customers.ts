// ESTO DEPENDE DEL BACKEND - Comentar esta línea cuando no haya backend disponible
// const customers = await getCustomers(page, limit, query);

// DATOS DE EJEMPLO - Usar estos datos cuando no haya backend disponible
import {ICustomersTableHome} from "@/contracts";

const mockCustomers:ICustomersTableHome[] = [
  {
    customerNumber: 103,
    customerName: "Atelier graphique",
    contactName: "Carine Schmitt",
    phone: "40.32.2555",
    city: "Nantes",
    country: "France",
    creditLimit: 21000.00,
    status: "Activo"
  },
  {
    customerNumber: 112,
    customerName: "Signal Gift Stores",
    contactName: "Jean King",
    phone: "7025551838",
    city: "Las Vegas",
    country: "USA",
    creditLimit: 71800.00,
    status: "VIP"
  },
  {
    customerNumber: 114,
    customerName: "Australian Collectors, Co.",
    contactName: "Peter Ferguson",
    phone: "03 9520 4555",
    city: "Melbourne",
    country: "Australia",
    creditLimit: 117300.00,
    status: "Activo"
  },
  {
    customerNumber: 119,
    customerName: "La Rochelle Gifts",
    contactName: "Janine Labrune",
    phone: "40.67.8555",
    city: "Nantes",
    country: "France",
    creditLimit: 118200.00,
    status: "Inactivo"
  },
  {
    customerNumber: 121,
    customerName: "Baane Mini Imports",
    contactName: "Jonas Bergulfsen",
    phone: "07-98 9555",
    city: "Stavern",
    country: "Norway",
    creditLimit: 81700.00,
    status: "Nuevo"
  },
  {
    customerNumber: 124,
    customerName: "Mini Gifts Distributors Ltd.",
    contactName: "Susan Nelson",
    phone: "4155551450",
    city: "San Rafael",
    country: "USA",
    creditLimit: 210500.00,
    status: "VIP"
  },
  {
    customerNumber: 125,
    customerName: "Havel & Zbyszek Co",
    contactName: "Zbyszek Piestrzeniewicz",
    phone: "(26) 642-7555",
    city: "Warszawa",
    country: "Poland",
    creditLimit: 0.00,
    status: "Moroso"
  }
];

// FUNCIÓN SIMULADA - Reemplaza a getCustomers cuando no hay backend
export const getCustomersMock = (page?: string, limit?: string, query?: string) => {
    const pageNum = parseInt(page || "1");
    const limitNum = parseInt(limit || "5");
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;
    
    // Filtrar por búsqueda si hay query
    let filtered = mockCustomers;
    if (query) {
        const searchLower = query.toLowerCase();
        filtered = mockCustomers.filter(customer => 
            customer.customerNumber.toString().toLowerCase().includes(searchLower) ||
            customer.customerName.toLowerCase().includes(searchLower) ||
            customer.contactName.toLowerCase().includes(searchLower) ||
            customer.city.toLowerCase().includes(searchLower) ||
            customer.country.toLowerCase().includes(searchLower)
        );
    }
    
    // Paginar los resultados
    const paginatedCustomers = filtered.slice(start, end);
    
    return {
        content: paginatedCustomers,
        totalPages: Math.ceil(filtered.length / limitNum),
        totalElements: filtered.length,
        size: limitNum,
        number: pageNum - 1,
        first: pageNum === 1,
        last: end >= filtered.length
    };
};