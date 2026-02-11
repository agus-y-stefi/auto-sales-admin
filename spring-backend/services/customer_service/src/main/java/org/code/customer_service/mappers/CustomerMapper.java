package org.code.customer_service.mappers;

import org.code.customer_service.dtos.CustomerDto;
import org.code.customer_service.dtos.CustomerDtoCreate;
import org.code.customer_service.dtos.CustomerDtoUpdate;
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

        return new CustomerDto(
                customer.getCustomerNumber(),
                customer.getCustomerName(),
                customer.getContactFirstName(),
                customer.getContactLastName(),
                customer.getPhone(),
                customer.getCity(),
                customer.getCountry(),
                customer.getCreditLimit(),
                customer.getStatus());

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
                .status(customerDto.getStatus())
                .build();
    }

    public Customer toEntity(CustomerDtoCreate customerDtoCreate) {
        if (customerDtoCreate == null) {
            return null;
        }

        return Customer.builder()
                .customerName(customerDtoCreate.getCustomerName())
                .contactFirstName(customerDtoCreate.getContactFirstName())
                .contactLastName(customerDtoCreate.getContactLastName())
                .phone(customerDtoCreate.getPhone())
                .city(customerDtoCreate.getCity())
                .country(customerDtoCreate.getCountry())
                .creditLimit(customerDtoCreate.getCreditLimit())
                .status("Active")
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

    public Customer mergeUpdate(Customer originalCustomer, CustomerDtoUpdate customerToUpdate) {
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

        if (customerToUpdate.getStatus() != null) {
            originalCustomer.setStatus(customerToUpdate.getStatus());
        }

        return originalCustomer;

    }
}