package org.code.orders_service.specifications;

import org.code.orders_service.models.Payment;
import org.code.orders_service.specifications.criteria.PaymentSearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class PaymentSpecifications {

    public static Specification<Payment> withCriteria(PaymentSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filtro por número de orden
            if (criteria.getOrderNumber() != null) {
                predicates.add(criteriaBuilder.equal(
                        root.get("orderNumber"), criteria.getOrderNumber()
                ));
            }

            // Filtro por número de cheque
            if (criteria.getCheckNumber() != null && !criteria.getCheckNumber().trim().isEmpty()) {
                if (criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            criteriaBuilder.lower(root.get("checkNumber")),
                            criteria.getCheckNumber().toLowerCase()
                    ));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("checkNumber")),
                            "%" + criteria.getCheckNumber().toLowerCase() + "%"
                    ));
                }
            }

            // Filtro por rango de fecha de pago
            if (criteria.getPaymentDateFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("paymentDate"), criteria.getPaymentDateFrom()
                ));
            }
            if (criteria.getPaymentDateTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("paymentDate"), criteria.getPaymentDateTo()
                ));
            }

            // Filtro por monto mínimo
            if (criteria.getMinAmount() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("amount"), criteria.getMinAmount()
                ));
            }

            // Filtro por monto máximo
            if (criteria.getMaxAmount() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("amount"), criteria.getMaxAmount()
                ));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static boolean hasNoFilters(PaymentSearchCriteria criteria) {
        return criteria.getOrderNumber() == null &&
                (criteria.getCheckNumber() == null || criteria.getCheckNumber().trim().isEmpty()) &&
                criteria.getPaymentDateFrom() == null &&
                criteria.getPaymentDateTo() == null &&
                criteria.getMinAmount() == null &&
                criteria.getMaxAmount() == null;
    }

    // Métodos específicos para casos particulares
    public static Specification<Payment> hasOrderNumber(Long orderNumber) {
        return (root, query, criteriaBuilder) ->
                orderNumber == null ? null :
                        criteriaBuilder.equal(root.get("orderNumber"), orderNumber);
    }

    public static Specification<Payment> hasCheckNumber(String checkNumber) {
        return (root, query, criteriaBuilder) ->
                checkNumber == null ? null :
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(root.get("checkNumber")),
                                checkNumber.toLowerCase()
                        );
    }

    public static Specification<Payment> hasPaymentDateBetween(LocalDate dateFrom, LocalDate dateTo) {
        return (root, query, criteriaBuilder) -> {
            if (dateFrom == null && dateTo == null) return null;
            if (dateFrom != null && dateTo != null) {
                return criteriaBuilder.between(root.get("paymentDate"), dateFrom, dateTo);
            }
            if (dateFrom != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("paymentDate"), dateFrom);
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("paymentDate"), dateTo);
        };
    }

    public static Specification<Payment> hasAmountBetween(BigDecimal min, BigDecimal max) {
        return (root, query, criteriaBuilder) -> {
            if (min == null && max == null) return null;
            if (min != null && max != null) {
                return criteriaBuilder.between(root.get("amount"), min, max);
            }
            if (min != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("amount"), min);
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("amount"), max);
        };
    }
}