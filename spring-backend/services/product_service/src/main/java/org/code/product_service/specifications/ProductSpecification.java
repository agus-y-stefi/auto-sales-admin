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

            // Text search on productCode and productName
            if (criteria.getQ() != null && !criteria.getQ().isEmpty()) {
                String pattern = "%" + criteria.getQ().toLowerCase() + "%";
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("productCode")), pattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("productName")), pattern)
                ));
            }

            // Filter by productLine (exact match on FK)
            if (criteria.getProductLine() != null && !criteria.getProductLine().trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(
                        root.get("productLine").get("productLine"),
                        criteria.getProductLine().trim()
                ));
            }

            // Filter by productVendor (LIKE, case-insensitive)
            if (criteria.getProductVendor() != null && !criteria.getProductVendor().trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("productVendor")),
                        "%" + criteria.getProductVendor().trim().toLowerCase() + "%"
                ));
            }

            // Filter by productScale (exact match)
            if (criteria.getProductScale() != null && !criteria.getProductScale().trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(
                        root.get("productScale"),
                        criteria.getProductScale().trim()
                ));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
