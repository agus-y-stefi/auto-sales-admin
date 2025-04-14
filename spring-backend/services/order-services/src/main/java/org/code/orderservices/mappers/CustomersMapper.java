package org.code.orderservices.mappers;

import org.code.orderservices.dto.customers.CustomersRequest;
import org.code.orderservices.dto.customers.CustomersResponse;
import org.code.orderservices.models.Customers;
import org.springframework.stereotype.Service;

@Service
public class CustomersMapper implements IMapper<Customers, CustomersRequest, CustomersResponse> {

    @Override
    public Customers toEntity(CustomersRequest request) {
        return Customers.builder()
                .build();
    }

    @Override
    public CustomersResponse toResponse(Customers entity) {
        return new CustomersResponse(

        );
    }
}
