package org.code.customer_service.specifications;

import org.code.customer_service.models.Office;
import org.code.customer_service.specifications.criteria.OfficeSearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class OfficeSpecifications {

    public static boolean hasNoFilters(String officeCode, String city, String country, 
                                     String state, String territory, String postalCode) {
        return (officeCode == null || officeCode.trim().isEmpty()) &&
               (city == null || city.trim().isEmpty()) &&
               (country == null || country.trim().isEmpty()) &&
               (state == null || state.trim().isEmpty()) &&
               (territory == null || territory.trim().isEmpty()) &&
               (postalCode == null || postalCode.trim().isEmpty());
    }

    public static Specification<Office> withCriteria(OfficeSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            boolean exactMatch = criteria.getExactMatch() != null && criteria.getExactMatch();

            if (criteria.getOfficeCode() != null && !criteria.getOfficeCode().trim().isEmpty()) {
                if (exactMatch) {
                    predicates.add(criteriaBuilder.equal(root.get("officeCode"), criteria.getOfficeCode()));
                } else {
                    predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("officeCode")), 
                        "%" + criteria.getOfficeCode().toLowerCase() + "%"
                    ));
                }
            }

            if (criteria.getCity() != null && !criteria.getCity().trim().isEmpty()) {
                if (exactMatch) {
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

            if (criteria.getCountry() != null && !criteria.getCountry().trim().isEmpty()) {
                if (exactMatch) {
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

            if (criteria.getState() != null && !criteria.getState().trim().isEmpty()) {
                if (exactMatch) {
                    predicates.add(criteriaBuilder.equal(
                        criteriaBuilder.lower(root.get("state")), 
                        criteria.getState().toLowerCase()
                    ));
                } else {
                    predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("state")), 
                        "%" + criteria.getState().toLowerCase() + "%"
                    ));
                }
            }

            if (criteria.getTerritory() != null && !criteria.getTerritory().trim().isEmpty()) {
                if (exactMatch) {
                    predicates.add(criteriaBuilder.equal(
                        criteriaBuilder.lower(root.get("territory")), 
                        criteria.getTerritory().toLowerCase()
                    ));
                } else {
                    predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("territory")), 
                        "%" + criteria.getTerritory().toLowerCase() + "%"
                    ));
                }
            }

            if (criteria.getPostalCode() != null && !criteria.getPostalCode().trim().isEmpty()) {
                if (exactMatch) {
                    predicates.add(criteriaBuilder.equal(root.get("postalCode"), criteria.getPostalCode()));
                } else {
                    predicates.add(criteriaBuilder.like(
                        root.get("postalCode"), 
                        "%" + criteria.getPostalCode() + "%"
                    ));
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}