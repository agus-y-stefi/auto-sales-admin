package org.code.orderservices.services;

import jakarta.persistence.EntityNotFoundException;
import org.code.orderservices.dto.orders.OrdersCreateRequest;
import org.code.orderservices.dto.orders.OrdersResponse;
import org.code.orderservices.mappers.OrdersMapper;
import org.code.orderservices.models.Customers;
import org.code.orderservices.models.Orders;
import org.code.orderservices.repositories.CustomersRepository;
import org.code.orderservices.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class OrdersService {

    private final OrdersRepository ordersRepository;
    private final CustomersRepository customersRepository;

    private final OrdersMapper ordersMapper;

    @Autowired
    public OrdersService(OrdersRepository ordersRepository, CustomersRepository customersRepository, OrdersMapper ordersMapper) {
        this.ordersRepository = ordersRepository;
        this.customersRepository = customersRepository;
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


    public OrdersResponse createOrder(OrdersCreateRequest ordersCreateRequest) {
        if (ordersRepository.existsById(ordersCreateRequest.orderNumber()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Order already exists with id: " + ordersCreateRequest.orderNumber());

        Orders orders = ordersMapper.toEntity(ordersCreateRequest);

        // Set the customer ID to the order
        // buscar el cliente por id una vez que se configure el OrdersRequest

        Customers c = customersRepository.findById(ordersCreateRequest.customerNumber())
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with id: " + ordersCreateRequest.customerNumber()));

        orders.setCustomer(c);


        return ordersMapper.toResponse(ordersRepository.save(orders));

    }

    public void deleteOrder(Integer orderId) {
        Orders orders = ordersRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + orderId));

        ordersRepository.delete(orders);
    }
}
