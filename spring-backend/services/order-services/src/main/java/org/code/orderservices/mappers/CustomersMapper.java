package org.code.orderservices.mappers;

import org.code.orderservices.dto.customers.CustomersCreateRequest;
import org.code.orderservices.dto.customers.CustomersResponse;
import org.code.orderservices.models.Customers;
import org.springframework.stereotype.Service;

@Service
public class CustomersMapper implements IMapper<Customers, CustomersCreateRequest, CustomersResponse> {

    @Override
    public Customers toEntity(CustomersCreateRequest request) {
        return Customers.builder()
                .customerNumber(request.customerNumber())
                .customerName(request.customerName())
                .contactLastName(request.contactLastName())
                .contactFirstName(request.contactFirstName())
                .phone(request.phone())
                .city(request.city())
                .country(request.country())
                .creditLimit(request.creditLimit())
                .build();
    }

    @Override
    public CustomersResponse toResponse(Customers entity) {
        return new CustomersResponse(
                entity.getCustomerNumber(),
                entity.getCustomerName(),
                entity.getContactLastName(),
                entity.getContactFirstName(),
                entity.getPhone(),
                entity.getCity(),
                entity.getCountry(),
                entity.getCreditLimit()
        );
    }
}
