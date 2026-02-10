package org.code.customer_service.specifications;

import org.code.customer_service.models.Employee;
import org.code.customer_service.specifications.criteria.EmployeeSearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class EmployeeSpecifications {

    public static boolean hasNoFilters(String firstName, String lastName, String extension, String officeCode) {
        return (firstName == null || firstName.trim().isEmpty()) &&
               (lastName == null || lastName.trim().isEmpty()) &&
               (extension == null || extension.trim().isEmpty()) &&
               (officeCode == null || officeCode.trim().isEmpty());
    }

    public static Specification<Employee> withCriteria(EmployeeSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            boolean exactMatch = criteria.getExactMatch() != null && criteria.getExactMatch();

            if (criteria.getFirstName() != null && !criteria.getFirstName().trim().isEmpty()) {
                if (exactMatch) {
                    predicates.add(criteriaBuilder.equal(
                        criteriaBuilder.lower(root.get("firstName")), 
                        criteria.getFirstName().toLowerCase()
                    ));
                } else {
                    predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("firstName")), 
                        "%" + criteria.getFirstName().toLowerCase() + "%"
                    ));
                }
            }

            if (criteria.getLastName() != null && !criteria.getLastName().trim().isEmpty()) {
                if (exactMatch) {
                    predicates.add(criteriaBuilder.equal(
                        criteriaBuilder.lower(root.get("lastName")), 
                        criteria.getLastName().toLowerCase()
                    ));
                } else {
                    predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("lastName")), 
                        "%" + criteria.getLastName().toLowerCase() + "%"
                    ));
                }
            }

            if (criteria.getExtension() != null && !criteria.getExtension().trim().isEmpty()) {
                if (exactMatch) {
                    predicates.add(criteriaBuilder.equal(root.get("extension"), criteria.getExtension()));
                } else {
                    predicates.add(criteriaBuilder.like(
                        root.get("extension"), 
                        "%" + criteria.getExtension() + "%"
                    ));
                }
            }

            if (criteria.getOfficeCode() != null && !criteria.getOfficeCode().trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(
                    root.get("office").get("officeCode"), 
                    criteria.getOfficeCode()
                ));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}