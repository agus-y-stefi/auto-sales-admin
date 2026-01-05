package org.code.orders_service.controllers;

import lombok.RequiredArgsConstructor;
import org.code.orders_service.clients.dto.ProductDTO;
import org.code.orders_service.dtos.OrderDetailDto;
import org.code.orders_service.dtos.OrderDetailDtoCreateUpdate;
import org.code.orders_service.services.OrderDetailService;
import org.code.orders_service.specifications.criteria.OrderDetailSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/order-details")
@RequiredArgsConstructor
public class OrderDetailController {

    private final OrderDetailService orderDetailService;

    @GetMapping
    public ResponseEntity<Page<OrderDetailDto>> getAllOrderDetails(
            @RequestParam(required = false) Long orderNumber,
            @RequestParam(required = false) String productCode,
            @RequestParam(required = false) Long minQuantityOrdered,
            @RequestParam(required = false) Long maxQuantityOrdered,
            @RequestParam(required = false) BigDecimal minPriceEach,
            @RequestParam(required = false) BigDecimal maxPriceEach,
            @RequestParam(required = false, defaultValue = "false") Boolean exactMatch,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir
    ) {
        OrderDetailSearchCriteria criteria = OrderDetailSearchCriteria.builder()
                .orderNumber(orderNumber)
                .productCode(productCode)
                .minQuantityOrdered(minQuantityOrdered)
                .maxQuantityOrdered(maxQuantityOrdered)
                .minPriceEach(minPriceEach)
                .maxPriceEach(maxPriceEach)
                .exactMatch(exactMatch)
                .build();

        return ResponseEntity.ok(
                orderDetailService.getAllOrderDetails(
                        criteria,
                        orderDetailService.buildPageable(page, size, sortBy, sortDir)
                )
        );
    }

    @GetMapping("/by-order/{orderNumber}")
    public ResponseEntity<List<OrderDetailDto>> getOrderDetailsByOrderNumber(@PathVariable Long orderNumber) {
        List<OrderDetailDto> orderDetails = orderDetailService.getOrderDetailsByOrderNumber(orderNumber);
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/{orderNumber}/{productCode}")
    public ResponseEntity<OrderDetailDto> getOrderDetailById(
            @PathVariable Long orderNumber,
            @PathVariable String productCode) {
        OrderDetailDto orderDetail = orderDetailService.getOrderDetailById(orderNumber, productCode);
        return ResponseEntity.ok(orderDetail);
    }

    @PostMapping("/")
    public ResponseEntity<OrderDetailDto> createOrderDetail(
            @RequestBody OrderDetailDtoCreateUpdate orderDetailDto) {
        OrderDetailDto createdOrderDetail = orderDetailService.createOrderDetail(orderDetailDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrderDetail);
    }

    // create bulk order details
    @PostMapping("/bulk")
    public ResponseEntity<List<OrderDetailDto>> createBulkOrderDetails(
            @RequestBody List<OrderDetailDtoCreateUpdate> orderDetailDtos
    ) {
        List<OrderDetailDto> createdOrderDetails = orderDetailService.createOrderDetails(orderDetailDtos);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrderDetails);
    }

    @PutMapping("/{orderNumber}/{productCode}")
    public ResponseEntity<OrderDetailDto> updateOrderDetail(
            @PathVariable Long orderNumber,
            @PathVariable String productCode,
            @RequestBody OrderDetailDtoCreateUpdate orderDetailDto
    ) {
        OrderDetailDto updatedOrderDetail = orderDetailService.updateOrderDetail(orderNumber, productCode, orderDetailDto);
        return ResponseEntity.ok(updatedOrderDetail);
    }

    @DeleteMapping("/{orderNumber}/{productCode}")
    public ResponseEntity<Void> deleteOrderDetail(
            @PathVariable Long orderNumber,
            @PathVariable String productCode) {
        orderDetailService.deleteOrderDetail(orderNumber, productCode);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/by-order/{orderNumber}")
    public ResponseEntity<Void> deleteOrderDetailsByOrderNumber(@PathVariable Long orderNumber) {
        orderDetailService.deleteOrderDetailsByOrderNumber(orderNumber);
        return ResponseEntity.noContent().build();
    }


}