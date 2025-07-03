package org.code.customer_service.mappers;

import org.code.customer_service.dtos.customers.CustomerCreateDTO;
import org.code.customer_service.dtos.customers.CustomerGetFullDTO;
import org.code.customer_service.models.Customer;
import org.springframework.stereotype.Service;

@Service
public class CustomerMapper {

    public CustomerGetFullDTO toResponse(final Customer customer) {
        if (customer == null) {
            return null;
        }

        return new CustomerGetFullDTO(
                customer.getCustomerNumber(),
                customer.getCustomerName(),
                customer.getContactLastName(),
                customer.getContactFirstName(),
                customer.getPhone(),
                customer.getCity(),
                customer.getCountry(),
                customer.getCreditLimit()
        );
    }

    public Customer toEntity(CustomerCreateDTO customer) {
        return Customer.builder()
                .customerName(customer.getCustomerName())
                .contactLastName(customer.getContactLastName())
                .contactFirstName(customer.getContactFirstName())
                .phone(customer.getPhone())
                .city(customer.getCity())
                .country(customer.getCountry())
                .creditLimit(customer.getCreditLimit())
                .build();
    }
}
