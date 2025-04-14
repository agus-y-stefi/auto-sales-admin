package org.code.orderservices.services;

import jakarta.persistence.EntityNotFoundException;
import org.code.orderservices.dto.orders.OrdersRequest;
import org.code.orderservices.dto.orders.OrdersResponse;
import org.code.orderservices.mappers.OrdersMapper;
import org.code.orderservices.models.Orders;
import org.code.orderservices.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersService {

    private final OrdersRepository ordersRepository;
    private final OrdersMapper ordersMapper;

    @Autowired
    public OrdersService(OrdersRepository ordersRepository, OrdersMapper ordersMapper) {
        this.ordersRepository = ordersRepository;
        this.ordersMapper = ordersMapper;
    }

    public List<OrdersResponse> getOrders() {
        return ordersRepository.findAll()
                .stream().map(ordersMapper::toResponse)
                .toList();
    }

    public OrdersResponse getOrdersByCustomerId(Integer customerId) {
        return ordersMapper.toResponse(
                ordersRepository.findById(customerId)
                        .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + customerId))
        );

    }


    public OrdersResponse createOrder(OrdersRequest ordersRequest) {
        Orders orders = ordersMapper.toEntity(ordersRequest);

        // Set the customer ID to the order
        // buscar el cliente por id una vez que se configure el OrdersRequest

        return ordersMapper.toResponse(ordersRepository.save(orders));

    }

    public void deleteOrder(Integer orderId) {
        Orders orders = ordersRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + orderId));

        ordersRepository.delete(orders);
    }
}
