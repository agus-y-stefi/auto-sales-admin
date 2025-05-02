package org.code.orderservices.clients;


import org.code.productservices.dto.orders_details.OrderNumberSumPriceResponse;
import org.springframework.web.service.annotation.GetExchange;

import java.util.List;
import java.util.Optional;

public interface IProductsClient {

    @GetExchange("/orders_details/statistic/sum_price")
    Optional<List<OrderNumberSumPriceResponse>> getOrdersDetailsByOrderNumber();

}
