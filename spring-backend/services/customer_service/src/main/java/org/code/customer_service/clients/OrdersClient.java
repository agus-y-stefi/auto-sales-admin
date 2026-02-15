package org.code.customer_service.clients;

import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.bind.annotation.PathVariable;

@HttpExchange("/api/orders")
public interface OrdersClient {

    @GetExchange("/exists/{customerNumber}")
    Boolean checkOrdersExist(@PathVariable Long customerNumber);

}
