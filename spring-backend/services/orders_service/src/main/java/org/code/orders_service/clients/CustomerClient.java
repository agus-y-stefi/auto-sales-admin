package org.code.orders_service.clients;

import org.code.orders_service.clients.dto.CustomerDto;
import org.code.orders_service.dtos.CustomPagedDTO;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class CustomerClient {

    private final RestClient restClient;

    public CustomerClient(@Qualifier("customerRestClient") RestClient restClient) {
        this.restClient = restClient;
    }

    public Map<Integer, String> getAllCustomersName() {
        try {
            CustomPagedDTO<CustomerDto> customersResponse = restClient
                    .get()
                    .uri("/api/customers") // 👈 relativo al baseUrl
                    .retrieve()
                    .body(new ParameterizedTypeReference<>() {});

            assert customersResponse != null;

            return customersResponse.getContent().stream()
                    .collect(Collectors.toMap(
                            CustomerDto::getCustomerNumber,
                            c -> c.getContactFirstName() + " " + c.getContactLastName(),
                            (a, b) -> a
                    ));

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            return Map.of();
        }
    }
}
