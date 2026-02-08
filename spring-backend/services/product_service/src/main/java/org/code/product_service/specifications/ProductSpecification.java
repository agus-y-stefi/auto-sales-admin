package org.code.product_service.specifications;

import org.code.product_service.models.Product;
import org.code.product_service.specifications.criteria.ProductSearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> withCriteria(ProductSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (criteria == null) {
                return criteriaBuilder.conjunction();
            }

            // Filtrar por productCode y productName
            if (criteria.getQ() != null && !criteria.getQ().isEmpty()) {
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("productCode"), "%" + criteria.getQ() + "%"),
                        criteriaBuilder.like(root.get("productName"), "%" + criteria.getQ() + "%")
                ));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
