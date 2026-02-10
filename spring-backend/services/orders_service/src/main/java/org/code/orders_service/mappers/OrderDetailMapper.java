package org.code.orders_service.mappers;

import org.code.orders_service.dtos.OrderDetailDto;
import org.code.orders_service.dtos.OrderDetailDtoCreateUpdate;
import org.code.orders_service.models.OrderDetail;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailMapper {

    public OrderDetailDto toDto(OrderDetail orderDetail) {
        if (orderDetail == null) {
            return null;
        }

        return OrderDetailDto.builder()
                .orderNumber(orderDetail.getOrderNumber())
                .productCode(orderDetail.getProductCode())
                .quantityOrdered(orderDetail.getQuantityOrdered())
                .priceEach(orderDetail.getPriceEach())
                .build();
    }

    public OrderDetail toEntity(OrderDetailDto orderDetailDto) {
        if (orderDetailDto == null) {
            return null;
        }

        return OrderDetail.builder()
                .orderNumber(orderDetailDto.getOrderNumber())
                .productCode(orderDetailDto.getProductCode())
                .quantityOrdered(orderDetailDto.getQuantityOrdered())
                .priceEach(orderDetailDto.getPriceEach())
                .build();
    }

    public OrderDetail toEntity(OrderDetailDtoCreateUpdate orderDetailDtoCreateUpdate) {
        if (orderDetailDtoCreateUpdate == null) {
            return null;
        }

        return OrderDetail.builder()
                .orderNumber(orderDetailDtoCreateUpdate.getOrderNumber())
                .productCode(orderDetailDtoCreateUpdate.getProductCode())
                .quantityOrdered(orderDetailDtoCreateUpdate.getQuantityOrdered())
                .priceEach(orderDetailDtoCreateUpdate.getPriceEach())
                .build();
    }

    public List<OrderDetailDto> toDtoList(List<OrderDetail> orderDetails) {
        if (orderDetails == null) {
            return null;
        }

        return orderDetails.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<OrderDetail> toEntityList(List<OrderDetailDto> orderDetailDtos) {
        if (orderDetailDtos == null) {
            return null;
        }

        return orderDetailDtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    public OrderDetail mergeUpdate(OrderDetail originalOrderDetail, OrderDetailDtoCreateUpdate orderDetailToUpdate) {
        if (originalOrderDetail == null || orderDetailToUpdate == null) {
            return originalOrderDetail;
        }

        if (orderDetailToUpdate.getQuantityOrdered() != null) {
            originalOrderDetail.setQuantityOrdered(orderDetailToUpdate.getQuantityOrdered());
        }
        if (orderDetailToUpdate.getPriceEach() != null) {
            originalOrderDetail.setPriceEach(orderDetailToUpdate.getPriceEach());
        }

        return originalOrderDetail;
    }
}