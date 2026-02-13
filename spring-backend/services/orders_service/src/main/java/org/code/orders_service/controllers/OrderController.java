package org.code.orders_service.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.code.orders_service.dtos.*;
import org.code.orders_service.services.OrderService;
import org.code.orders_service.specifications.criteria.OrderSearchCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<CustomPagedDTO<OrderDto>> getAllOrders(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) List<String> status,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir) {
        OrderSearchCriteria criteria = OrderSearchCriteria.builder()
                .status(status)
                .q(q)
                .build();

        return ResponseEntity.ok(
                CustomPagedDTO.from(
                        orderService.getAllOrders(
                                criteria,
                                orderService.buildPageable(page, size, sortBy, sortDir))));
    }

    @GetMapping("/resume")
    public ResponseEntity<CustomPagedDTO<OrderDtoResume>> getAllOrdersResume(
            @RequestParam(required = false) List<String> status,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir) {
        OrderSearchCriteria criteria = OrderSearchCriteria.builder()
                .q(q)
                .status(status)
                .build();

        return ResponseEntity.ok(
                CustomPagedDTO.from(
                        orderService.getAllOrdersResume(
                                criteria,
                                orderService.buildPageable(page, size, sortBy, sortDir))));
    }

    @Operation(summary = "Get recent orders", description = "Retrieves the most recent orders for a customer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Recent orders retrieved successfully", content = @Content(schema = @Schema(implementation = OrderRecentDto.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    @GetMapping("/recent/{customerNumber}")
    public ResponseEntity<List<OrderRecentDto>> getRecentOrders(
            @PathVariable Long customerNumber,
            @RequestParam(required = false) Integer size) {
        if (size == null || size <= 0) {
            size = 5;
        }
        return ResponseEntity.ok(orderService.getRecentOrders(size, customerNumber));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        OrderDto order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{id}/with-payment-resume")
    public ResponseEntity<OrderDtoWithPaymentResume> getOrderByIdWithPaymentResume(@PathVariable Long id) {
        OrderDtoWithPaymentResume order = orderService.getOrderByIdWithPaymentInfo(id);
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
            @RequestBody OrderDtoCreateUpdate orderDto) {
        OrderDto updatedOrder = orderService.updateOrder(id, orderDto);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}