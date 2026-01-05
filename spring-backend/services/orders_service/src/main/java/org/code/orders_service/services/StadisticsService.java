package org.code.orders_service.services;

import lombok.RequiredArgsConstructor;
import org.code.orders_service.dtos.CustomersStatsDTO;
import org.code.orders_service.projection.CustomersStatsProjection;
import org.code.orders_service.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StadisticsService {

    private final OrderRepository orderRepository;

    @Autowired
    public StadisticsService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
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
}
