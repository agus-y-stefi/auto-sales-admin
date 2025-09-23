package org.code.orders_service.clients;

import org.code.orders_service.clients.dto.CustomerDto;
import org.code.orders_service.dtos.CustomPagedDTO;
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
    private final String customerServiceUrl;

    public CustomerClient(RestClient restClient,
                          @Value("${microservices.customer.url:http://localhost:8081}") String customerServiceUrl) {
        this.restClient = restClient;
        this.customerServiceUrl = customerServiceUrl;
    }

    // GET lista paginada de customers
    public Map<Integer, String> getAllCustomersName() {
        try {
            CustomPagedDTO<CustomerDto> customersResponse = restClient
                    .get()
                    .uri(customerServiceUrl + "/api/customers")
                    .retrieve()
                    .body(new ParameterizedTypeReference<CustomPagedDTO<CustomerDto>>() {});

            assert customersResponse != null;

            return customersResponse.getContent().stream()
                    .collect(Collectors.toMap(
                            CustomerDto::getCustomerNumber,
                            c -> c.getContactFirstName() + " " + c.getContactLastName(),
                            (a, b) -> a  // en caso de claves duplicadas, se queda con el primero
                    ));


        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            return Map.of();
        }
    }

}