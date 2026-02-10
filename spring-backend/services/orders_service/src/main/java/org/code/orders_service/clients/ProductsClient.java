package org.code.orders_service.clients;

import org.code.orders_service.clients.dto.ProductDTO;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

import java.util.List;

@HttpExchange("/api/products") // Prefijo común para todos los endpoints de productos
public interface ProductsClient {

    // Spring convertirá automáticamente la lista en ?ids=A&ids=B
    @GetExchange("/bulk")
    List<ProductDTO> getBulkProducts(@RequestParam("ids") List<String> productIds);
}