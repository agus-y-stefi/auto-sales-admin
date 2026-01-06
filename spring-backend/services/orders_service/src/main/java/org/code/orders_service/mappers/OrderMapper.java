package org.code.orders_service.mappers;

import org.code.orders_service.dtos.*;
import org.code.orders_service.models.Order;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderMapper {

    public OrderDto toDto(Order order) {
        if (order == null) {
            return null;
        }

        return OrderDto.builder()
                .orderNumber(order.getOrderNumber())
                .orderDate(order.getOrderDate())
                .requiredDate(order.getRequiredDate())
                .shippedDate(order.getShippedDate())
                .status(order.getStatus())
                .comments(order.getComments())
                .customerNumber(order.getCustomerNumber())
                .salesRepEmployeeNumber(order.getSalesRepEmployeeNumber())
                .orderDetails(order.getOrderDetails() != null ?
                        order.getOrderDetails().stream()
                                .map(detail -> OrderDetailDto.builder()
                                        .orderNumber(detail.getOrderNumber())
                                        .productCode(detail.getProductCode())
                                        .quantityOrdered(detail.getQuantityOrdered())
                                        .priceEach(detail.getPriceEach())
                                        .build())
                                .collect(Collectors.toList()) : null)
                .payments(order.getPayments() != null ?
                        order.getPayments().stream()
                                .map(payment -> PaymentDto.builder()
                                        .orderNumber(payment.getOrderNumber())
                                        .checkNumber(payment.getCheckNumber())
                                        .paymentDate(payment.getPaymentDate())
                                        .amount(payment.getAmount())
                                        .build())
                                .collect(Collectors.toList()) : null)
                .build();
    }

    public OrderDtoResume toDtoResume(OrderDto order, Map<Long, String> allCustomersName, Map<Long, BigDecimal> totalsMap) {
        if (order == null) {
            return null;
        }

        return OrderDtoResume.builder()
                .orderNumber(order.getOrderNumber())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .customerName(allCustomersName.get(order.getCustomerNumber()))
                .totalPrice(totalsMap.getOrDefault(order.getOrderNumber(), BigDecimal.ZERO))
                .build();

    }

    public OrderDtoWithPaymentResume toDtoWithPaymentResume(OrderDto order, BigDecimal totalPrice, BigDecimal totalPayment) {
        if (order == null) {
            return null;
        }

        return OrderDtoWithPaymentResume.builder()
                .orderNumber(order.getOrderNumber())
                .orderDate(order.getOrderDate())
                .requiredDate(order.getRequiredDate())
                .shippedDate(order.getShippedDate())
                .status(order.getStatus())
                .comments(order.getComments())
                .customerNumber(order.getCustomerNumber())
                .salesRepEmployeeNumber(order.getSalesRepEmployeeNumber())
                .totalPrice(totalPrice)
                .totalPaidAmount(totalPayment)
                .isFullyPaid(totalPrice.compareTo(totalPayment) <= 0)
                .remainingAmount(totalPrice.subtract(totalPayment))
                .build();

    }

    public Order toEntity(OrderDto orderDto) {
        if (orderDto == null) {
            return null;
        }

        return Order.builder()
                .orderNumber(orderDto.getOrderNumber())
                .orderDate(orderDto.getOrderDate())
                .requiredDate(orderDto.getRequiredDate())
                .shippedDate(orderDto.getShippedDate())
                .status(orderDto.getStatus())
                .comments(orderDto.getComments())
                .customerNumber(orderDto.getCustomerNumber())
                .salesRepEmployeeNumber(orderDto.getSalesRepEmployeeNumber())
                .build();
    }

    public Order toEntity(OrderDtoCreateUpdate orderDtoCreateUpdate) {
        if (orderDtoCreateUpdate == null) {
            return null;
        }

        return Order.builder()
                .orderDate(orderDtoCreateUpdate.getOrderDate())
                .requiredDate(orderDtoCreateUpdate.getRequiredDate())
                .shippedDate(orderDtoCreateUpdate.getShippedDate())
                .status(orderDtoCreateUpdate.getStatus())
                .comments(orderDtoCreateUpdate.getComments())
                .customerNumber(orderDtoCreateUpdate.getCustomerNumber())
                .salesRepEmployeeNumber(orderDtoCreateUpdate.getSalesRepEmployeeNumber())
                .build();
    }

    public List<OrderDto> toDtoList(List<Order> orders) {
        if (orders == null) {
            return null;
        }

        return orders.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<Order> toEntityList(List<OrderDto> orderDtos) {
        if (orderDtos == null) {
            return null;
        }

        return orderDtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    public Order mergeUpdate(Order originalOrder, OrderDtoCreateUpdate orderToUpdate) {
        if (originalOrder == null || orderToUpdate == null) {
            return originalOrder;
        }

        if (orderToUpdate.getOrderDate() != null) {
            originalOrder.setOrderDate(orderToUpdate.getOrderDate());
        }
        if (orderToUpdate.getRequiredDate() != null) {
            originalOrder.setRequiredDate(orderToUpdate.getRequiredDate());
        }
        if (orderToUpdate.getShippedDate() != null) {
            originalOrder.setShippedDate(orderToUpdate.getShippedDate());
        }
        if (orderToUpdate.getStatus() != null) {
            originalOrder.setStatus(orderToUpdate.getStatus());
        }
        if (orderToUpdate.getComments() != null) {
            originalOrder.setComments(orderToUpdate.getComments());
        }
        if (orderToUpdate.getCustomerNumber() != null) {
            originalOrder.setCustomerNumber(orderToUpdate.getCustomerNumber());
        }
        if (orderToUpdate.getSalesRepEmployeeNumber() != null) {
            originalOrder.setSalesRepEmployeeNumber(orderToUpdate.getSalesRepEmployeeNumber());
        }

        return originalOrder;
    }


}