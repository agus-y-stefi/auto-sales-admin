package org.code.customer_service.controllers;

import org.code.customer_service.dtos.customers.CustomerCreateDTO;
import org.code.customer_service.dtos.customers.CustomerGetFullDTO;
import org.code.customer_service.dtos.pages.CustomPageResponse;
import org.code.customer_service.services.CustomerService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


    @GetMapping
    public ResponseEntity<CustomPageResponse<CustomerGetFullDTO>> getAllCustomers(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {

        return ResponseEntity.ok(customerService.getCustomers(query, page, limit));
    }

    @PostMapping
    public ResponseEntity<CustomerGetFullDTO> createCustomer(@RequestBody CustomerCreateDTO customer) {
        CustomerGetFullDTO createdCustomer = customerService.createCustomer(customer);
        return ResponseEntity.status(201).body(createdCustomer);
    }

}
