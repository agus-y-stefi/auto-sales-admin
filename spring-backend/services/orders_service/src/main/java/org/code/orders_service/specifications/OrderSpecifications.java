package org.code.orders_service.specifications;

import org.code.orders_service.models.Order;
import org.code.orders_service.specifications.criteria.OrderSearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

public class OrderSpecifications {

    public static Specification<Order> withCriteria(OrderSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (criteria.getQ() != null) {
                predicates.add(
                        criteriaBuilder.like(
                                criteriaBuilder.toString(root.get("orderNumber")),
                                "%" + criteria.getQ() + "%"
                        )
                );
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

    public static boolean hasFilters(OrderSearchCriteria criteria) {
        return criteria.getQ() != null
                || (criteria.getStatus() != null && !criteria.getStatus().isEmpty());
    }

}