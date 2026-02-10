package org.code.customer_service.specifications;

import org.code.customer_service.models.Customer;
import org.code.customer_service.specifications.criteria.CustomerSearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

public class CustomerSpecifications {

    public static Specification<Customer> withCriteria(CustomerSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Búsqueda unificada por nombre de cliente O número de cliente
            if (criteria.getQ() != null && !criteria.getQ().trim().isEmpty()) {
                String searchTerm = "%" + criteria.getQ().toLowerCase() + "%";

                Predicate nameMatch = criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("customerName")),
                        searchTerm
                );

                Predicate numberMatch = criteriaBuilder.like(
                        criteriaBuilder.lower(
                                criteriaBuilder.function(
                                        "to_char", String.class,
                                        root.get("customerNumber"),
                                        criteriaBuilder.literal("999999") // formato de salida
                                )
                        ),
                        searchTerm
                );


                // Combinar ambas búsquedas con OR
                predicates.add(criteriaBuilder.or(nameMatch, numberMatch));
            }

            // Filtro por status - maneja una lista
            if (criteria.getStatus() != null && !criteria.getStatus().isEmpty()) {
                // Filtrar valores nulos o vacíos de la lista
                List<String> validStatuses = criteria.getStatus().stream()
                        .filter(status -> status != null && !status.trim().isEmpty())
                        .map(String::toLowerCase)
                        .toList();

                if (!validStatuses.isEmpty()) {
                    predicates.add(criteriaBuilder.lower(root.get("status")).in(validStatuses));
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static boolean hasNoFilters(CustomerSearchCriteria criteria) {
        return (criteria.getQ() == null || criteria.getQ().trim().isEmpty()) &&
                (criteria.getStatus() == null || criteria.getStatus().isEmpty() ||
                        criteria.getStatus().stream().allMatch(status -> status == null || status.trim().isEmpty()));
    }

    // Método específico para búsqueda por query unificada
    public static Specification<Customer> hasQueryContaining(String query) {
        return (root, query1, criteriaBuilder) -> {
            if (query == null || query.trim().isEmpty()) return null;

            String searchTerm = "%" + query.toLowerCase() + "%";

            Predicate nameMatch = criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("customerName")),
                    searchTerm
            );

            Predicate numberMatch = criteriaBuilder.like(
                    criteriaBuilder.lower(
                            criteriaBuilder.function("CAST", String.class,
                                    root.get("customerNumber"), criteriaBuilder.literal("varchar"))
                    ),
                    searchTerm
            );

            return criteriaBuilder.or(nameMatch, numberMatch);
        };
    }

    // Método específico para filtrar por lista de status
    public static Specification<Customer> hasStatusIn(List<String> statusList) {
        return (root, query, criteriaBuilder) -> {
            if (statusList == null || statusList.isEmpty()) return null;

            List<String> validStatuses = statusList.stream()
                    .filter(status -> status != null && !status.trim().isEmpty())
                    .map(String::toLowerCase)
                    .toList();

            return validStatuses.isEmpty() ? null :
                    criteriaBuilder.lower(root.get("status")).in(validStatuses);
        };
    }
}