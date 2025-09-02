package org.code.customer_service.specifications;

import org.code.customer_service.models.Customer;
import org.code.customer_service.specifications.criteria.CustomerSearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CustomerSpecifications {

    public static Specification<Customer> withCriteria(CustomerSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Búsqueda por nombre del cliente
            if (criteria.getCustomerName() != null && !criteria.getCustomerName().trim().isEmpty()) {
                if (criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            criteriaBuilder.lower(root.get("customerName")),
                            criteria.getCustomerName().toLowerCase()
                    ));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("customerName")),
                            "%" + criteria.getCustomerName().toLowerCase() + "%"
                    ));
                }
            }

            // Filtro por ciudad
            if (criteria.getCity() != null && !criteria.getCity().trim().isEmpty()) {
                if (criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            criteriaBuilder.lower(root.get("city")),
                            criteria.getCity().toLowerCase()
                    ));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("city")),
                            "%" + criteria.getCity().toLowerCase() + "%"
                    ));
                }
            }

            // Filtro por país
            if (criteria.getCountry() != null && !criteria.getCountry().trim().isEmpty()) {
                if (criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            criteriaBuilder.lower(root.get("country")),
                            criteria.getCountry().toLowerCase()
                    ));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("country")),
                            "%" + criteria.getCountry().toLowerCase() + "%"
                    ));
                }
            }

            // Filtro por límite de crédito mínimo
            if (criteria.getMinCreditLimit() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("creditLimit"), criteria.getMinCreditLimit()
                ));
            }

            // Filtro por límite de crédito máximo
            if (criteria.getMaxCreditLimit() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("creditLimit"), criteria.getMaxCreditLimit()
                ));
            }

            // Filtro por nombre de contacto
            if (criteria.getContactFirstName() != null && !criteria.getContactFirstName().trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("contactFirstName")),
                        "%" + criteria.getContactFirstName().toLowerCase() + "%"
                ));
            }

            // Filtro por apellido de contacto
            if (criteria.getContactLastName() != null && !criteria.getContactLastName().trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("contactLastName")),
                        "%" + criteria.getContactLastName().toLowerCase() + "%"
                ));
            }

            // Filtro por teléfono
            if (criteria.getPhone() != null && !criteria.getPhone().trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        root.get("phone"), "%" + criteria.getPhone() + "%"
                ));
            }

            // Filtro por status - ahora maneja una lista
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
        return (criteria.getCustomerName() == null || criteria.getCustomerName().trim().isEmpty()) &&
                (criteria.getCity() == null || criteria.getCity().trim().isEmpty()) &&
                (criteria.getCountry() == null || criteria.getCountry().trim().isEmpty()) &&
                (criteria.getMinCreditLimit() == null) &&
                (criteria.getMaxCreditLimit() == null) &&
                (criteria.getContactFirstName() == null || criteria.getContactFirstName().trim().isEmpty()) &&
                (criteria.getContactLastName() == null || criteria.getContactLastName().trim().isEmpty()) &&
                (criteria.getPhone() == null || criteria.getPhone().trim().isEmpty()) &&
                (criteria.getStatus() == null || criteria.getStatus().isEmpty() ||
                        criteria.getStatus().stream().allMatch(status -> status == null || status.trim().isEmpty()));
    }

    // Métodos específicos para casos particulares
    public static Specification<Customer> hasCustomerNameContaining(String customerName) {
        return (root, query, criteriaBuilder) ->
                customerName == null ? null :
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("customerName")),
                                "%" + customerName.toLowerCase() + "%"
                        );
    }

    public static Specification<Customer> hasCity(String city) {
        return (root, query, criteriaBuilder) ->
                city == null ? null :
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(root.get("city")),
                                city.toLowerCase()
                        );
    }

    public static Specification<Customer> hasCountry(String country) {
        return (root, query, criteriaBuilder) ->
                country == null ? null :
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(root.get("country")),
                                country.toLowerCase()
                        );
    }

    public static Specification<Customer> hasCreditLimitBetween(BigDecimal min, BigDecimal max) {
        return (root, query, criteriaBuilder) -> {
            if (min == null && max == null) return null;
            if (min != null && max != null) {
                return criteriaBuilder.between(root.get("creditLimit"), min, max);
            }
            if (min != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("creditLimit"), min);
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("creditLimit"), max);
        };
    }

    // Nuevo método específico para filtrar por lista de status
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