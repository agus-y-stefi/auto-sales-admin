package org.code.customer_service.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.code.customer_service.dtos.*;
import org.code.customer_service.services.CustomerService;
import org.code.customer_service.specifications.criteria.CustomerSearchCriteria;
import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PageableAsQueryParam
    @GetMapping
    public ResponseEntity<CustomPagedDTO<CustomerDto>> getAllCustomers(
            @RequestParam(required = false) List<String> status,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir) {
        CustomerSearchCriteria criteria = CustomerSearchCriteria.builder()
                .status(status)
                .q(q)
                .build();

        return ResponseEntity.ok(
                CustomPagedDTO.from(
                        customerService.getAllCustomers(
                                criteria,
                                customerService.buildPageable(page, size, sortBy, sortDir) // retorna null si no se
                                                                                           // especifica size de la
                                                                                           // pagina
                        )));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable Integer id) {
        CustomerDto customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }

    @PostMapping
    public ResponseEntity<CustomerDto> createCustomer(@Valid @RequestBody CustomerDtoCreate customerDto) {
        CustomerDto createdCustomer = customerService.createCustomer(customerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerDto> updateCustomer(
            @PathVariable Integer id,
            @RequestBody CustomerDtoUpdate customerDto) {
        // Assuming there's an update method in the service
        CustomerDto updatedCustomer = customerService.updateCustomer(id, customerDto);
        return ResponseEntity.ok(updatedCustomer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/names")
    public ResponseEntity<List<CustomerNameDTO>> getCustomersNames(@RequestParam List<Integer> ids) {
        return ResponseEntity.ok(customerService.getCustomersNames(ids));
    }
}