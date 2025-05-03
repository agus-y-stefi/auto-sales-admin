package org.code.orderservices.dto.orders;

public record OrderNumberSumPriceResponse(
        Integer order_number,
        Double sum_price
) {
}