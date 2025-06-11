package org.code.orderservices.services;

import jakarta.persistence.EntityNotFoundException;
import org.code.orderservices.dto.customers.CustomersCreateRequest;
import org.code.orderservices.dto.customers.CustomersResponse;
import org.code.orderservices.mappers.CustomersMapper;
import org.code.orderservices.models.Customers;
import org.code.orderservices.repositories.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CustomersService {

    private final CustomersRepository customersRepository;
    private final CustomersMapper customersMapper;


    @Autowired
    public CustomersService(CustomersRepository customersRepository, CustomersMapper customersMapper) {
        this.customersRepository = customersRepository;
        this.customersMapper = customersMapper;
    }

    public List<CustomersResponse> getCustomers() {
        return customersRepository.findAll()
                .stream().map(customersMapper::toResponse)
                .toList();
    }

    public CustomersResponse getCustomerById(Integer customerId) {
        return customersMapper.toResponse(
                customersRepository.findById(customerId)
                        .orElseThrow(() -> new EntityNotFoundException("Customer not found with id: " + customerId))
        );
    }


    public CustomersResponse createCustomer(CustomersCreateRequest customersResponse) {

        if (customersRepository.existsById(customersResponse.customerNumber()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Customer already exists with id: " + customersResponse.customerNumber());

        return customersMapper.toResponse(
                customersRepository.save(
                        customersMapper.toEntity(customersResponse)
                )
        );
    }

    public void deleteCustomer(Integer customerId) {
        Customers customers = customersRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with id: " + customerId));

        customersRepository.delete(customers);
    }
}
