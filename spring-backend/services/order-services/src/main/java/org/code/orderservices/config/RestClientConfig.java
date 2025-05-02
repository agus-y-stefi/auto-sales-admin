package org.code.orderservices.config;

import org.code.orderservices.clients.IProductsClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class RestClientConfig {

    @Value("${product.service.url}")
    private String productServiceUrl;

    @Bean
    public IProductsClient productsClient() {
        return HttpServiceProxyFactory.builderFor(
                        RestClientAdapter.create(
                                RestClient.builder()
                                        .baseUrl(productServiceUrl)
                                        .build()
                        )
                ).build()
                .createClient(IProductsClient.class);
    }


}
