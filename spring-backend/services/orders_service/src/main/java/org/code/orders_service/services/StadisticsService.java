package org.code.orders_service.services;

import org.code.orders_service.clients.ProductsClient;
import org.code.orders_service.clients.dto.ProductDTO;
import org.code.orders_service.dtos.CustomersStatsDTO;
import org.code.orders_service.dtos.TopProductCustomerDTO;
import org.code.orders_service.projection.CustomersStatsProjection;
import org.code.orders_service.projection.TopProductCustomerProjection;
import org.code.orders_service.repositories.OrderDetailRepository;
import org.code.orders_service.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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

    public List<TopProductCustomerDTO> getTopThreeProductsByCustomer(Long customerId) {
        Pageable topThree = PageRequest.of(0, 3);


        Map<String, Long> topProducts = orderDetailRepository.findTopProductsByCustomer(customerId, topThree)
                .stream()
                .collect(java.util.stream.Collectors.toMap(
                        TopProductCustomerProjection::getProductCode,
                        TopProductCustomerProjection::getCantidadComprada
                ));

        if (topProducts.isEmpty()) {
            return java.util.Collections.emptyList();
        }

        return productsClient.getBulkProducts(topProducts.keySet().stream().toList())
                .stream().map(p -> TopProductCustomerDTO.builder()
                        .productCode(p.getProductCode())
                        .productName(p.getProductName())
                        .msrp(p.getMsrp())
                        .productDescription(p.getProductDescription())
                        .quantityInStock(p.getQuantityInStock())
                        .cantidadComprada(topProducts.get(p.getProductCode()))
                        .build()
                ).collect(java.util.stream.Collectors.toList());
    }
}
