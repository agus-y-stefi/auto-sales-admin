package org.code.orders_service.clients;

import org.code.orders_service.clients.dto.CustomerNameDTO;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

import java.util.List;

@HttpExchange("/api/customers") // Prefijo común para todos los endpoints de productos
public interface CustomersClient {


    @GetExchange("/names")
    List<CustomerNameDTO> getCustomersNames(@RequestParam("ids") List<Long> ids);

}
