package org.code.orders_service.services;

import org.code.orders_service.clients.ProductsClient;
import org.code.orders_service.clients.dto.ProductDTO;
import org.code.orders_service.dtos.CustomersStatsDTO;
import org.code.orders_service.projection.CustomersStatsProjection;
import org.code.orders_service.repositories.OrderDetailRepository;
import org.code.orders_service.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StadisticsService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;

    private final ProductsClient productsClient;

    @Autowired
    public StadisticsService(OrderRepository orderRepository, OrderDetailRepository orderDetailRepository, ProductsClient productsClient) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.productsClient = productsClient;
    }

    public CustomersStatsDTO getCustomerOrdersInfo(Long customerId) {

        CustomersStatsProjection stats = orderRepository.getDashboardSummary(customerId);

        return CustomersStatsDTO.builder()
                .cantidadOrdenes(stats.getCantidadOrdenes())
                .ordenesCompletadas(stats.getOrdenesCompletadas())
                .precioPromedio(stats.getPrecioPromedio())
                .totalOrden(stats.getTotalOrden())
                .totalPagado(stats.getTotalPagado())
                .ultimaOrdenFecha(stats.getUltimaOrdenFecha())
                .build();


    }

    public List<ProductDTO> getTopThreeProductsByCustomer(Long customerId) {
        Pageable topThree = PageRequest.of(0, 3);

        List<String> productsCode = orderDetailRepository.findTopProductsByCustomer(customerId, topThree);


        List<ProductDTO> productos = productsClient.getBulkProducts(productsCode);

        return productos;
    }
}
