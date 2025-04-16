package org.code.orderservices.controllers;

import org.code.orderservices.dto.orders.OrdersCreateRequest;
import org.code.orderservices.dto.orders.OrdersResponse;
import org.code.orderservices.dto.orders.OrdersResumeResponse;
import org.code.orderservices.services.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    private final OrdersService ordersService;

    @Autowired
    public OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @GetMapping
    public ResponseEntity<List<OrdersResponse>> getOrders() {
        return ResponseEntity.ok(ordersService.getOrders());
    }

    @GetMapping("/resume")
    public ResponseEntity<List<OrdersResumeResponse>> getOrdersResume(
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "15") Integer limit,
            @RequestParam(defaultValue = "0") Integer page
    ) {
        return ResponseEntity.ok(ordersService.getOrdersResume(q, limit, page));
    }


    @GetMapping("/{orderNumber}")
    public ResponseEntity<OrdersResponse> getOrdersByCustomerId(@PathVariable Integer orderNumber) {
        return ResponseEntity.ok(ordersService.getOrdersByCustomerId(orderNumber));
    }

    @PostMapping
    public ResponseEntity<OrdersResponse> createOrder(@RequestBody OrdersCreateRequest ordersCreateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ordersService.createOrder(ordersCreateRequest));
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer orderId) {
        ordersService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }
}
