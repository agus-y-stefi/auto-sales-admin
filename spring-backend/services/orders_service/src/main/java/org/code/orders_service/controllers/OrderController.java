package org.code.orders_service.controllers;

import lombok.RequiredArgsConstructor;
import org.code.orders_service.dtos.OrderDto;
import org.code.orders_service.dtos.OrderDtoCreateUpdate;
import org.code.orders_service.services.OrderService;
import org.code.orders_service.specifications.criteria.OrderSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<OrderDto>> getAllOrders(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate orderDateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate orderDateTo,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate requiredDateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate requiredDateTo,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate shippedDateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate shippedDateTo,
            @RequestParam(required = false) Long customerNumber,
            @RequestParam(required = false) Long salesRepEmployeeNumber,
            @RequestParam(required = false) String comments,
            @RequestParam(required = false, defaultValue = "false") Boolean exactMatch,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir
    ) {
        OrderSearchCriteria criteria = OrderSearchCriteria.builder()
                .status(status)
                .orderDateFrom(orderDateFrom)
                .orderDateTo(orderDateTo)
                .requiredDateFrom(requiredDateFrom)
                .requiredDateTo(requiredDateTo)
                .shippedDateFrom(shippedDateFrom)
                .shippedDateTo(shippedDateTo)
                .customerNumber(customerNumber)
                .salesRepEmployeeNumber(salesRepEmployeeNumber)
                .comments(comments)
                .exactMatch(exactMatch)
                .build();

        return ResponseEntity.ok(
                orderService.getAllOrders(
                        criteria,
                        orderService.buildPageable(page, size, sortBy, sortDir)
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        OrderDto order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDtoCreateUpdate orderDto) {
        OrderDto createdOrder = orderService.createOrder(orderDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDto> updateOrder(
            @PathVariable Long id,
            @RequestBody OrderDtoCreateUpdate orderDto
    ) {
        OrderDto updatedOrder = orderService.updateOrder(id, orderDto);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}