package org.code.productservices.dto.orders_details;

public record OrderNumberSumPriceResponse(
        Integer order_number,
        Double sum_price
) {
}
