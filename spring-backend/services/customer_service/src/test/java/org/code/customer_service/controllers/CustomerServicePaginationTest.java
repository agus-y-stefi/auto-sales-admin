package org.code.customer_service.controllers;

import org.code.customer_service.dtos.CustomerDto;
import org.code.customer_service.mappers.CustomerMapper;
import org.code.customer_service.models.Customer;
import org.code.customer_service.repositories.CustomerRepository;
import org.code.customer_service.services.CustomerService;
import org.code.customer_service.specifications.CustomerSpecifications;
import org.code.customer_service.specifications.criteria.CustomerSearchCriteria;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CustomerServicePaginationTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CustomerMapper customerMapper;

    @InjectMocks
    private CustomerService customerService;

    private List<Customer> sampleCustomers;
    private List<CustomerDto> sampleCustomerDtos;


    @BeforeEach
    void setUp() {
        // Datos de prueba: dos clientes simulados
        sampleCustomers = Arrays.asList(
                Customer.builder()
                        .customerNumber(1)
                        .customerName("Acme Corporation")
                        .contactFirstName("John")
                        .contactLastName("Doe")
                        .phone("+54 11 1234-5678")
                        .city("Buenos Aires")
                        .country("Argentina")
                        .creditLimit(new BigDecimal("15000.00"))
                        .build(),
                Customer.builder()
                        .customerNumber(2)
                        .customerName("Globex Inc.")
                        .contactFirstName("Jane")
                        .contactLastName("Smith")
                        .phone("+54 351 765-4321")
                        .city("Córdoba")
                        .country("Argentina")
                        .creditLimit(new BigDecimal("25000.00"))
                        .build()
        );

        // Versiones DTO equivalentes
        sampleCustomerDtos = Arrays.asList(
                new CustomerDto(
                        1,
                        "Acme Corporation",
                        "John",
                        "Doe",
                        "+54 11 1234-5678",
                        "Buenos Aires",
                        "Argentina",
                        new BigDecimal("15000.00"),
                        "vip"
                ),
                new CustomerDto(
                        2,
                        "Globex Inc.",
                        "Jane",
                        "Smith",
                        "+54 351 765-4321",
                        "Córdoba",
                        "Argentina",
                        new BigDecimal("25000.00"),
                        "vip"
                )
        );
    }

    @Test
    void getAllCustomers_WithPageable_NoFilters_ReturnsPagedResult() {
        
    }



}
