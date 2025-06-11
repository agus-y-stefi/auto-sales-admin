package org.code.productservices.controllers;


import org.code.productservices.dto.orders_details.OrderDetailsResponse;
import org.code.productservices.dto.orders_details.OrderNumberSumPriceResponse;
import org.code.productservices.services.OrdersDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders_details")
public class OrdersDetailsController {

    private final OrdersDetailsService ordersDetailsController;

    @Autowired
    public OrdersDetailsController(OrdersDetailsService ordersDetailsController) {
        this.ordersDetailsController = ordersDetailsController;
    }

    @GetMapping
    public ResponseEntity<List<OrderDetailsResponse>> getOrdersDetails() {
        return ResponseEntity.ok(ordersDetailsController.getOrdersDetails());
    }

    @GetMapping("/{order_number}/{product_code}")
    public ResponseEntity<OrderDetailsResponse> getOrderDetailsById(@PathVariable Integer order_number, @PathVariable String product_code) {
        return ResponseEntity.ok(ordersDetailsController.getOrderDetailsById(order_number, product_code));
    }

    @GetMapping("/statistic/sum_price")
    public ResponseEntity<List<OrderNumberSumPriceResponse>> getOrderDetailsSum() {
        return ResponseEntity.ok(ordersDetailsController.getOrderDetailsSum());
    }


}
