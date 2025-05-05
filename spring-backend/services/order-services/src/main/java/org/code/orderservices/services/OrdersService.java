package org.code.orderservices.services;

import jakarta.persistence.EntityNotFoundException;
import org.code.orderservices.clients.IProductsClient;
import org.code.orderservices.dto.orders.OrdersCreateRequest;
import org.code.orderservices.dto.orders.OrdersResponse;
import org.code.orderservices.dto.orders.OrdersResumeResponse;
import org.code.orderservices.mappers.OrdersMapper;
import org.code.orderservices.models.Customers;
import org.code.orderservices.models.Orders;
import org.code.orderservices.repositories.CustomersRepository;
import org.code.orderservices.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

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

    public OrdersResponse getOrdersByCustomerId(Integer orderNumber) {
        return ordersMapper.toResponse(
                ordersRepository.findById(orderNumber)
                        .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + orderNumber))
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

    public Page<OrdersResumeResponse> getOrdersResume(String q, Integer limit, Integer page) {

        boolean isPageable = limit != null && limit > 0;
        boolean isQ = q != null && !q.isEmpty();

        Page<Orders> ordersPage;
        int pageCount = (isPageable) ? limit : Integer.MAX_VALUE;

        page = Math.max(page, 0);

        if (isPageable && isQ) {
            ordersPage = ordersRepository.findByCustomer_CustomerNameContain(q, PageRequest.of(page, pageCount));
        } else if (isPageable) {
            ordersPage = ordersRepository.findAll(PageRequest.of(page, limit));
        } else if (isQ) {
            ordersPage = ordersRepository.findByCustomer_CustomerNameContain(q, PageRequest.of(0, pageCount));
        } else {
            ordersPage = ordersRepository.findAll(PageRequest.of(0, pageCount));
        }

        return ordersPage.map(ordersMapper::toResumeResponse); // Usamos map() para devolver un Page<OrdersResumeResponse>
    }

}
