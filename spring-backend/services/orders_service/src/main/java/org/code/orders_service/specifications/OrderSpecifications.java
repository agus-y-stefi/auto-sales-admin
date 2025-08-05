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

            // Filtro por status
            if (criteria.getStatus() != null && !criteria.getStatus().trim().isEmpty()) {
                if (criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            criteriaBuilder.lower(root.get("status")),
                            criteria.getStatus().toLowerCase()
                    ));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("status")),
                            "%" + criteria.getStatus().toLowerCase() + "%"
                    ));
                }
            }

            // Filtro por rango de fecha de orden
            if (criteria.getOrderDateFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("orderDate"), criteria.getOrderDateFrom()
                ));
            }
            if (criteria.getOrderDateTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("orderDate"), criteria.getOrderDateTo()
                ));
            }

            // Filtro por rango de fecha requerida
            if (criteria.getRequiredDateFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("requiredDate"), criteria.getRequiredDateFrom()
                ));
            }
            if (criteria.getRequiredDateTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("requiredDate"), criteria.getRequiredDateTo()
                ));
            }

            // Filtro por rango de fecha de envío
            if (criteria.getShippedDateFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("shippedDate"), criteria.getShippedDateFrom()
                ));
            }
            if (criteria.getShippedDateTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("shippedDate"), criteria.getShippedDateTo()
                ));
            }

            // Filtro por número de cliente
            if (criteria.getCustomerNumber() != null) {
                predicates.add(criteriaBuilder.equal(
                        root.get("customerNumber"), criteria.getCustomerNumber()
                ));
            }

            // Filtro por número de empleado representante de ventas
            if (criteria.getSalesRepEmployeeNumber() != null) {
                predicates.add(criteriaBuilder.equal(
                        root.get("salesRepEmployeeNumber"), criteria.getSalesRepEmployeeNumber()
                ));
            }

            // Filtro por comentarios
            if (criteria.getComments() != null && !criteria.getComments().trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("comments")),
                        "%" + criteria.getComments().toLowerCase() + "%"
                ));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static boolean hasNoFilters(OrderSearchCriteria criteria) {
        return (criteria.getStatus() == null || criteria.getStatus().trim().isEmpty()) &&
                criteria.getOrderDateFrom() == null &&
                criteria.getOrderDateTo() == null &&
                criteria.getRequiredDateFrom() == null &&
                criteria.getRequiredDateTo() == null &&
                criteria.getShippedDateFrom() == null &&
                criteria.getShippedDateTo() == null &&
                criteria.getCustomerNumber() == null &&
                criteria.getSalesRepEmployeeNumber() == null &&
                (criteria.getComments() == null || criteria.getComments().trim().isEmpty());
    }

    // Métodos específicos para casos particulares
    public static Specification<Order> hasStatus(String status) {
        return (root, query, criteriaBuilder) ->
                status == null ? null :
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(root.get("status")),
                                status.toLowerCase()
                        );
    }

    public static Specification<Order> hasCustomerNumber(Long customerNumber) {
        return (root, query, criteriaBuilder) ->
                customerNumber == null ? null :
                        criteriaBuilder.equal(root.get("customerNumber"), customerNumber);
    }

    public static Specification<Order> hasSalesRepEmployeeNumber(Long salesRepEmployeeNumber) {
        return (root, query, criteriaBuilder) ->
                salesRepEmployeeNumber == null ? null :
                        criteriaBuilder.equal(root.get("salesRepEmployeeNumber"), salesRepEmployeeNumber);
    }

    public static Specification<Order> hasOrderDateBetween(LocalDate dateFrom, LocalDate dateTo) {
        return (root, query, criteriaBuilder) -> {
            if (dateFrom == null && dateTo == null) return null;
            if (dateFrom != null && dateTo != null) {
                return criteriaBuilder.between(root.get("orderDate"), dateFrom, dateTo);
            }
            if (dateFrom != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("orderDate"), dateFrom);
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("orderDate"), dateTo);
        };
    }

    public static Specification<Order> hasRequiredDateBetween(LocalDate dateFrom, LocalDate dateTo) {
        return (root, query, criteriaBuilder) -> {
            if (dateFrom == null && dateTo == null) return null;
            if (dateFrom != null && dateTo != null) {
                return criteriaBuilder.between(root.get("requiredDate"), dateFrom, dateTo);
            }
            if (dateFrom != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("requiredDate"), dateFrom);
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("requiredDate"), dateTo);
        };
    }

    public static Specification<Order> hasShippedDateBetween(LocalDate dateFrom, LocalDate dateTo) {
        return (root, query, criteriaBuilder) -> {
            if (dateFrom == null && dateTo == null) return null;
            if (dateFrom != null && dateTo != null) {
                return criteriaBuilder.between(root.get("shippedDate"), dateFrom, dateTo);
            }
            if (dateFrom != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("shippedDate"), dateFrom);
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("shippedDate"), dateTo);
        };
    }
}