package org.code.orders_service.specifications;

import org.code.orders_service.models.OrderDetail;
import org.code.orders_service.specifications.criteria.OrderDetailSearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class OrderDetailSpecifications {

    public static Specification<OrderDetail> withCriteria(OrderDetailSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filtro por número de orden
            if (criteria.getOrderNumber() != null) {
                predicates.add(criteriaBuilder.equal(
                        root.get("orderNumber"), criteria.getOrderNumber()
                ));
            }

            // Filtro por código de producto
            if (criteria.getProductCode() != null && !criteria.getProductCode().trim().isEmpty()) {
                if (criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            criteriaBuilder.lower(root.get("productCode")),
                            criteria.getProductCode().toLowerCase()
                    ));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("productCode")),
                            "%" + criteria.getProductCode().toLowerCase() + "%"
                    ));
                }
            }

            // Filtro por cantidad mínima ordenada
            if (criteria.getMinQuantityOrdered() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("quantityOrdered"), criteria.getMinQuantityOrdered()
                ));
            }

            // Filtro por cantidad máxima ordenada
            if (criteria.getMaxQuantityOrdered() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("quantityOrdered"), criteria.getMaxQuantityOrdered()
                ));
            }

            // Filtro por precio mínimo por unidad
            if (criteria.getMinPriceEach() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("priceEach"), criteria.getMinPriceEach()
                ));
            }

            // Filtro por precio máximo por unidad
            if (criteria.getMaxPriceEach() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("priceEach"), criteria.getMaxPriceEach()
                ));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static boolean hasNoFilters(OrderDetailSearchCriteria criteria) {
        return criteria.getOrderNumber() == null &&
                (criteria.getProductCode() == null || criteria.getProductCode().trim().isEmpty()) &&
                criteria.getMinQuantityOrdered() == null &&
                criteria.getMaxQuantityOrdered() == null &&
                criteria.getMinPriceEach() == null &&
                criteria.getMaxPriceEach() == null;
    }

    // Métodos específicos para casos particulares
    public static Specification<OrderDetail> hasOrderNumber(Long orderNumber) {
        return (root, query, criteriaBuilder) ->
                orderNumber == null ? null :
                        criteriaBuilder.equal(root.get("orderNumber"), orderNumber);
    }

    public static Specification<OrderDetail> hasProductCode(String productCode) {
        return (root, query, criteriaBuilder) ->
                productCode == null ? null :
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(root.get("productCode")),
                                productCode.toLowerCase()
                        );
    }

    public static Specification<OrderDetail> hasQuantityOrderedBetween(Long min, Long max) {
        return (root, query, criteriaBuilder) -> {
            if (min == null && max == null) return null;
            if (min != null && max != null) {
                return criteriaBuilder.between(root.get("quantityOrdered"), min, max);
            }
            if (min != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("quantityOrdered"), min);
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("quantityOrdered"), max);
        };
    }

    public static Specification<OrderDetail> hasPriceEachBetween(BigDecimal min, BigDecimal max) {
        return (root, query, criteriaBuilder) -> {
            if (min == null && max == null) return null;
            if (min != null && max != null) {
                return criteriaBuilder.between(root.get("priceEach"), min, max);
            }
            if (min != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("priceEach"), min);
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("priceEach"), max);
        };
    }
}