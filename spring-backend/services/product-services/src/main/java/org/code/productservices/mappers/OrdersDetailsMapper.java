package org.code.productservices.mappers;

import org.code.productservices.dto.orders_details.OrderDetailsRequest;
import org.code.productservices.dto.orders_details.OrderDetailsResponse;
import org.code.productservices.models.OrderDetails;
import org.springframework.stereotype.Service;

@Service
public class OrdersDetailsMapper{

    public OrderDetailsResponse toResponse(OrderDetails orderDetails) {
        return new OrderDetailsResponse();
    }

    public OrderDetails toEntity(OrderDetailsRequest orderDetailsRequest) {
        return new OrderDetails();
    }


}
