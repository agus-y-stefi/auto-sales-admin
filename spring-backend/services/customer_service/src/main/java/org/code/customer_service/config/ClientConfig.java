package org.code.customer_service.config;

import org.code.customer_service.clients.OrdersClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class ClientConfig {

    @Bean
    public OrdersClient ordersClient() {
        RestClient restClient = RestClient.builder()
                .baseUrl("http://localhost:8082")
                .build();

        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(
                org.springframework.web.client.support.RestClientAdapter.create(restClient)).build();

        return factory.createClient(OrdersClient.class);
    }
}
