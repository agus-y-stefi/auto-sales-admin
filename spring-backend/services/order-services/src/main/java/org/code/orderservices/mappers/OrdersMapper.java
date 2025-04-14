package org.code.orderservices.mappers;

import org.code.orderservices.dto.orders.OrdersRequest;
import org.code.orderservices.dto.orders.OrdersResponse;
import org.code.orderservices.models.Orders;
import org.springframework.stereotype.Service;

@Service
public class OrdersMapper implements IMapper<Orders, OrdersRequest, OrdersResponse> {

    @Override
    public Orders toEntity(OrdersRequest request) {
        return Orders.builder()
                .build();
    }

    @Override
    public OrdersResponse toResponse(Orders entity) {
        return new OrdersResponse(

        );
    }
}
