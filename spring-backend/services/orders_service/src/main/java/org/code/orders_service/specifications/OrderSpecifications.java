package org.code.orders_service.specifications;

import org.code.orders_service.models.Order;
import org.code.orders_service.specifications.criteria.OrderSearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class OrderSpecifications {

    public static Specification<Order> withCriteria(OrderSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (criteria.getQ() != null){
                predicates.add(
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("orderNumber")),
                                "%" + criteria.getQ().toLowerCase() + "%"
                        )
                );
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static boolean hasNoFilters(OrderSearchCriteria criteria) {
        return criteria.getQ() == null;
    }

}