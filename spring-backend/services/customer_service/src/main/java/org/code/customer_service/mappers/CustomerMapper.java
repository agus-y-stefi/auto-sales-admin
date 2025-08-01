package org.code.customer_service.mappers;

import org.code.customer_service.dtos.CustomerDto;
import org.code.customer_service.dtos.CustomerDtoCreateUpdate;
import org.code.customer_service.models.Customer;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerMapper {

    public CustomerDto toDto(Customer customer) {
        if (customer == null) {
            return null;
        }

        return CustomerDto.builder()
                .customerNumber(customer.getCustomerNumber())
                .customerName(customer.getCustomerName())
                .contactFirstName(customer.getContactFirstName())
                .contactLastName(customer.getContactLastName())
                .phone(customer.getPhone())
                .city(customer.getCity())
                .country(customer.getCountry())
                .creditLimit(customer.getCreditLimit())
                .build();
    }

    public Customer toEntity(CustomerDto customerDto) {
        if (customerDto == null) {
            return null;
        }

        return Customer.builder()
                .customerNumber(customerDto.getCustomerNumber())
                .customerName(customerDto.getCustomerName())
                .contactFirstName(customerDto.getContactFirstName())
                .contactLastName(customerDto.getContactLastName())
                .phone(customerDto.getPhone())
                .city(customerDto.getCity())
                .country(customerDto.getCountry())
                .creditLimit(customerDto.getCreditLimit())
                .build();
    }

    public Customer toEntity(CustomerDtoCreateUpdate customerDtoCreateUpdate) {
        if (customerDtoCreateUpdate == null) {
            return null;
        }

        return Customer.builder()
                .customerName(customerDtoCreateUpdate.getCustomerName())
                .contactFirstName(customerDtoCreateUpdate.getContactFirstName())
                .contactLastName(customerDtoCreateUpdate.getContactLastName())
                .phone(customerDtoCreateUpdate.getPhone())
                .city(customerDtoCreateUpdate.getCity())
                .country(customerDtoCreateUpdate.getCountry())
                .creditLimit(customerDtoCreateUpdate.getCreditLimit())
                .build();
    }

    public List<CustomerDto> toDtoList(List<Customer> customers) {
        if (customers == null) {
            return null;
        }

        return customers.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<Customer> toEntityList(List<CustomerDto> customerDtos) {
        if (customerDtos == null) {
            return null;
        }

        return customerDtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    public Customer mergeUpdate(Customer originalCustomer, CustomerDtoCreateUpdate customerToUpdate) {
        if (originalCustomer == null || customerToUpdate == null) {
            return originalCustomer;
        }

        // Actualizar los campos que no son ID
        if (customerToUpdate.getCustomerName() != null) {
            originalCustomer.setCustomerName(customerToUpdate.getCustomerName());
        }
        if (customerToUpdate.getContactFirstName() != null) {
            originalCustomer.setContactFirstName(customerToUpdate.getContactFirstName());
        }
        if (customerToUpdate.getContactLastName() != null) {
            originalCustomer.setContactLastName(customerToUpdate.getContactLastName());
        }
        if (customerToUpdate.getPhone() != null) {
            originalCustomer.setPhone(customerToUpdate.getPhone());
        }
        if (customerToUpdate.getCity() != null) {
            originalCustomer.setCity(customerToUpdate.getCity());
        }
        if (customerToUpdate.getCountry() != null) {
            originalCustomer.setCountry(customerToUpdate.getCountry());
        }
        if (customerToUpdate.getCreditLimit() != null) {
            originalCustomer.setCreditLimit(customerToUpdate.getCreditLimit());
        }

        return originalCustomer;


    }
}