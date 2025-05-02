package org.code.productservices.services;

import org.code.productservices.dto.orders_details.OrderDetailsResponse;
import org.code.productservices.dto.orders_details.OrderNumberSumPriceResponse;
import org.code.productservices.mappers.OrdersDetailsMapper;
import org.code.productservices.models.serializers.OrderDetailsId;
import org.code.productservices.repositories.OrdersDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersDetailsService {

    private final OrdersDetailsRepository ordersDetailsRepository;
    private final OrdersDetailsMapper ordersDetailsMapper;

    @Autowired
    public OrdersDetailsService(OrdersDetailsRepository ordersDetailsRepository, OrdersDetailsMapper ordersDetailsMapper) {
        this.ordersDetailsRepository = ordersDetailsRepository;
        this.ordersDetailsMapper = ordersDetailsMapper;
    }


    public List<OrderDetailsResponse> getOrdersDetails() {
        return ordersDetailsRepository.findAll()
                .stream()
                .map(ordersDetailsMapper::toResponse)
                .toList();
    }


    public OrderDetailsResponse getOrderDetailsById(Integer orderNumber, String productCode) {
        return ordersDetailsRepository.findById(new OrderDetailsId(orderNumber, productCode))
                .map(ordersDetailsMapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Order details not found"));
    }

    public List<OrderNumberSumPriceResponse> getOrderDetailsSum() {
        return ordersDetailsRepository.getAllOrderTotals();
    }
}
