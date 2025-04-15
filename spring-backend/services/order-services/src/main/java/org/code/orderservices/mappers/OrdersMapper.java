package org.code.orderservices.mappers;

import org.code.orderservices.dto.orders.OrdersCreateRequest;
import org.code.orderservices.dto.orders.OrdersResponse;
import org.code.orderservices.dto.orders.OrdersResumeResponse;
import org.code.orderservices.models.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class OrdersMapper implements IMapper<Orders, OrdersCreateRequest, OrdersResponse> {

    private final CustomersMapper customersMapper;

    @Autowired
    public OrdersMapper(CustomersMapper customersMapper) {
        this.customersMapper = customersMapper;
    }

    @Override
    public Orders toEntity(OrdersCreateRequest request) {
        return Orders.builder()
                .orderNumber(request.orderNumber())
                .orderDate(request.orderDate())
                .requiredDate(request.requiredDate())
                .shippedDate(request.shippedDate())
                .status(request.status())
                .comments(request.comments())
                .saleRepEmployeeNumber(request.saleRepEmployeeNumber())
                .build();
    }

    @Override
    public OrdersResponse toResponse(Orders entity) {
        return new OrdersResponse(
                entity.getOrderNumber(),
                entity.getOrderDate(),
                entity.getRequiredDate(),
                entity.getShippedDate(),
                entity.getStatus(),
                entity.getComments(),
                customersMapper.toResponse(entity.getCustomer()),
                entity.getSaleRepEmployeeNumber()
        );
    }

    public OrdersResumeResponse toResumeResponse(Orders orders) {
        return new OrdersResumeResponse(
                orders.getOrderNumber(),
                orders.getOrderDate().toLocalDate(),
                orders.getCustomer().getCustomerName(),
                orders.getStatus(),
                new BigDecimal(0)
        );
    }
}
