package org.code.orders_service.config;

import org.code.orders_service.clients.CustomersClient;
import org.code.orders_service.clients.ProductsClient; // Tu interfaz de productos
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class ClientConfig {

    @Value("${application.clients.products.url}")
    private String productsUrl;

    @Value("${application.clients.customers.url}") // Nota: Sería ideal unificar nombres de propiedades también
    private String customerUrl;

    /**
     * Configuración para el Cliente de Productos (Interface Declarativa)
     */
    @Bean
    public ProductsClient productsClient(RestClient.Builder builder) {
        RestClient restClient = builder
                .baseUrl(productsUrl)
                .build();

        // Magia: Usamos el adaptador de RestClient (Síncrono)
        RestClientAdapter adapter = RestClientAdapter.create(restClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();

        return factory.createClient(ProductsClient.class);
    }

    @Bean
    CustomersClient customersClient(RestClient.Builder builder){

        RestClient restClient = builder
                .baseUrl(customerUrl)
                .build();

        RestClientAdapter adapter = RestClientAdapter.create(restClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();

        return factory.createClient(CustomersClient.class);
    }

}