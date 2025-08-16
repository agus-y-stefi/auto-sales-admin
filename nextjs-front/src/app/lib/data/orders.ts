
// ESTO DEPENDE DEL BACKEND - Comentar esta línea cuando no haya backend disponible
    // const products = await getOrders(page, limit, query);

    // DATOS DE EJEMPLO - Usar estos datos cuando no haya backend disponible
import {IOrderTableHome} from "@/contracts";

const mockOrders:IOrderTableHome[] = [
      {
        orderNumber: 10103,
        orderDate: "2024-03-22",
        customerName: "Emma Wil",
        status: "Enviado",
        total: 475.75,
      },
      {
        orderNumber: 10106,
        orderDate: "2024-03-25",
        customerName: "Frank Thompson",
        status: "En proceso",
        total: 199.99,
      },
      {
        orderNumber: 10107,
        orderDate: "2024-03-28",
        customerName: "Grace Martinez",
        status: "Pendiente",
        total: 134.45,
      },
      {
        orderNumber: 10108,
        orderDate: "2024-03-30",
        customerName: "Henry Clark",
        status: "Enviado",
        total: 289.99,
      },
      {orderNumber: 10114,
      orderDate: "2024-03-30",
      customerName: "Henry Clark",
      status: "Entregado",
      total: 289.99,
    }
  ];

  // FUNCIÓN SIMULADA - Reemplaza a getProducts cuando no hay backend
  export const getOrdersMock = (page: string, limit: string, query: string) => {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const start = (pageNum - 1) * limitNum;
      const end = start + limitNum;
      
      // Filtrar por búsqueda si hay query
      let filtered = mockOrders;
      if (query) {
          const searchLower = query.toLowerCase();
          filtered = mockOrders.filter(order => 
              order.orderNumber.toString().toLowerCase().includes(searchLower) ||
              order.customerName.toLowerCase().includes(searchLower)
          );
      }
      
      // Paginar los resultados
      const paginatedProducts = filtered.slice(start, end);
      
      return {
          content: paginatedProducts,
          totalPages: Math.ceil(filtered.length / limitNum),
          totalElements: filtered.length,
          size: limitNum,
          number: pageNum - 1,
          first: pageNum === 1,
          last: end >= filtered.length
      };
  };