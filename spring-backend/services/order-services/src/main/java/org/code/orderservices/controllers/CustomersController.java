package org.code.orderservices.controllers;


import org.code.orderservices.dto.customers.CustomersCreateRequest;
import org.code.orderservices.dto.customers.CustomersResponse;
import org.code.orderservices.services.CustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomersController {

    private final CustomersService customersService;

    @Autowired
    public CustomersController(CustomersService customersService) {
        this.customersService = customersService;
    }

    @GetMapping
    public ResponseEntity<List<CustomersResponse>> getCustomers() {
        return ResponseEntity.ok(customersService.getCustomers());
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<CustomersResponse> getCustomerById(@PathVariable Integer customerId) {
        return ResponseEntity.ok(customersService.getCustomerById(customerId));
    }

    @PostMapping
    public ResponseEntity<CustomersResponse> createCustomer(@RequestBody CustomersCreateRequest customersResponse) {
        return ResponseEntity.status(201).body(customersService.createCustomer(customersResponse));
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Integer customerId) {
        customersService.deleteCustomer(customerId);
        return ResponseEntity.noContent().build();
    }

}
