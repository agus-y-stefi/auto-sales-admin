package org.code.customer_service.services;

import org.code.customer_service.dtos.customers.CustomerCreateDTO;
import org.code.customer_service.dtos.customers.CustomerGetFullDTO;
import org.code.customer_service.dtos.pages.CustomPageResponse;
import org.code.customer_service.mappers.CustomerMapper;
import org.code.customer_service.models.Customer;
import org.code.customer_service.repositories.CustomerRepository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Autowired
    public CustomerService(CustomerRepository customerRepository, CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }


    public CustomPageResponse<CustomerGetFullDTO> getCustomers(String nombre, int page, int limit) {

        Pageable pageable = PageRequest.of(page, limit);

        Page<Customer> pageCustomer;

        if (nombre == null || nombre.isEmpty()) {
            pageCustomer = customerRepository.findAll(pageable);
        } else {
            pageCustomer = customerRepository.findCustomerByCustomerNameContainingIgnoreCase(nombre, pageable);
        }

        return new CustomPageResponse<>(
                pageCustomer.getContent().stream()
                        .map(customerMapper::toResponse)
                        .toList(),
                pageCustomer.getNumber(),
                pageCustomer.getSize(),
                pageCustomer.getTotalElements(),
                pageCustomer.getTotalPages(),
                (int) customerRepository.count()
        );


    }

    public CustomerGetFullDTO createCustomer(CustomerCreateDTO customer) {
        return customerMapper.toResponse(
                customerRepository.save(
                        customerMapper.toEntity(customer)
                )
        );
    }
}
