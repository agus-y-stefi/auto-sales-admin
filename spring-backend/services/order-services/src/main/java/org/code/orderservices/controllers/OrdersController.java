package org.code.orderservices.controllers;

import org.code.orderservices.dto.customers.CustomersResponse;
import org.code.orderservices.dto.orders.OrdersRequest;
import org.code.orderservices.dto.orders.OrdersResponse;
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
    public ResponseEntity<List<OrdersResponse>> getOrders(){
        return ResponseEntity.ok(ordersService.getOrders());
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<OrdersResponse> getOrdersByCustomerId(@PathVariable Integer customerId){
        return ResponseEntity.ok(ordersService.getOrdersByCustomerId(customerId));
    }

    @PostMapping
    public ResponseEntity<OrdersResponse> createOrder(@RequestBody OrdersRequest ordersRequest){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ordersService.createOrder(ordersRequest));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteOrder(@RequestParam Integer orderId){
        ordersService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }
}
