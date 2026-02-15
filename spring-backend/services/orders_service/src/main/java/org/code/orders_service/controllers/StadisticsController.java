package org.code.orders_service.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.code.orders_service.clients.dto.ProductDTO;
import org.code.orders_service.dtos.ApiErrorResponse;
import org.code.orders_service.dtos.CustomersStatsDTO;
import org.code.orders_service.dtos.TopProductCustomerDTO;
import org.code.orders_service.services.StadisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stadistic")
public class StadisticsController {

    private final StadisticsService stadisticsService;

    public StadisticsController(StadisticsService stadisticsService) {
        this.stadisticsService = stadisticsService;
    }

    @Operation(summary = "Get customer financial statistics", description = "Retrieves aggregated order and payment statistics for a customer (Financial Diagnosis)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Statistics retrieved successfully", content = @Content(schema = @Schema(implementation = CustomersStatsDTO.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    @GetMapping("/customer-orders-info/{customerId}")
    public ResponseEntity<CustomersStatsDTO> getCustomerOrdersInfo(@PathVariable("customerId") Long customerId) {
        return ResponseEntity.ok(stadisticsService.getCustomerOrdersInfo(customerId));
    }

    @Operation(summary = "Get top 3 products", description = "Retrieves the top 3 most purchased products for a customer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Top products retrieved successfully", content = @Content(schema = @Schema(implementation = TopProductCustomerDTO.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    @GetMapping("/top-three-products/{customerNumber}")
    public ResponseEntity<List<TopProductCustomerDTO>> getTopThreeProductsByCustomer(
            @PathVariable("customerNumber") Long customerNumber) {
        return ResponseEntity.ok(stadisticsService.getTopThreeProductsByCustomer(customerNumber));
    }

}
