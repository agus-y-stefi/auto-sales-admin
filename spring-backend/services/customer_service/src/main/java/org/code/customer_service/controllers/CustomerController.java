package org.code.customer_service.controllers;

import lombok.RequiredArgsConstructor;
import org.code.customer_service.dtos.CustomerDto;
import org.code.customer_service.dtos.CustomerDtoCreateUpdate;
import org.code.customer_service.services.CustomerService;
import org.code.customer_service.specifications.criteria.CustomerSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;


    @GetMapping
    public ResponseEntity<Page<CustomerDto>> getAllCustomers(
            @RequestParam(required = false) String customerName,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) BigDecimal minCreditLimit,
            @RequestParam(required = false) BigDecimal maxCreditLimit,
            @RequestParam(required = false) String contactFirstName,
            @RequestParam(required = false) String contactLastName,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false, defaultValue = "false") Boolean exactMatch,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir
    ) {
        CustomerSearchCriteria criteria = CustomerSearchCriteria.builder()
                .customerName(customerName)
                .city(city)
                .country(country)
                .minCreditLimit(minCreditLimit)
                .maxCreditLimit(maxCreditLimit)
                .contactFirstName(contactFirstName)
                .contactLastName(contactLastName)
                .phone(phone)
                .exactMatch(exactMatch)
                .build();

        return ResponseEntity.ok(
                customerService.getAllCustomers(
                        criteria,
                        customerService.buildPageable(page, size, sortBy, sortDir) // retorna null si no se especifica size de la pagina
                )
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable Integer id) {
        CustomerDto customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }

    @PostMapping
    public ResponseEntity<CustomerDto> createCustomer(@RequestBody CustomerDtoCreateUpdate customerDto) {
        CustomerDto createdCustomer = customerService.createCustomer(customerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerDto> updateCustomer(
            @PathVariable Integer id,
            @RequestBody CustomerDtoCreateUpdate customerDto
    ) {
        // Assuming there's an update method in the service
        CustomerDto updatedCustomer = customerService.updateCustomer(id, customerDto);
        return ResponseEntity.ok(updatedCustomer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }
}