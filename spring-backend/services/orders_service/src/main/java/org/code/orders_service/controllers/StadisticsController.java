package org.code.orders_service.controllers;

import lombok.RequiredArgsConstructor;
import org.code.orders_service.dtos.CustomersStatsDTO;
import org.code.orders_service.services.StadisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stadistic")
public class StadisticsController {


    private final StadisticsService stadisticsService;

    @Autowired
    public StadisticsController(StadisticsService stadisticsService) {
        this.stadisticsService = stadisticsService;
    }


    @GetMapping("/customer-orders-info/{customerId}")
    public ResponseEntity<CustomersStatsDTO> getCustomerOrdersInfo(@PathVariable("customerId")  Long customerId) {
        return ResponseEntity.ok(stadisticsService.getCustomerOrdersInfo(customerId));
    }


}
