package org.code.product_service.specifications;

import org.code.product_service.models.ProductLine;
import org.code.product_service.specifications.criteria.ProductLineSearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class ProductLineSpecification {

    public static Specification<ProductLine> withCriteria(ProductLineSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (criteria == null) {
                return criteriaBuilder.conjunction();
            }

            // Búsqueda por product line
            if (criteria.getProductLine() != null && !criteria.getProductLine().trim().isEmpty()) {
                if (criteria.getExactMatch() != null && criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            root.get("productLine"), criteria.getProductLine().trim()));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("productLine")),
                            "%" + criteria.getProductLine().trim().toLowerCase() + "%"));
                }
            }

            // Búsqueda por descripción
            if (criteria.getTextDescription() != null && !criteria.getTextDescription().trim().isEmpty()) {
                if (criteria.getExactMatch() != null && criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            root.get("textDescription"), criteria.getTextDescription().trim()));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("textDescription")),
                            "%" + criteria.getTextDescription().trim().toLowerCase() + "%"));
                }
            }

            // Filtrar por si tiene productos o no
            if (criteria.getHasProducts() != null) {
                var productsJoin = root.join("products", JoinType.LEFT);
                if (criteria.getHasProducts()) {
                    predicates.add(criteriaBuilder.isNotNull(productsJoin.get("productCode")));
                } else {
                    predicates.add(criteriaBuilder.isNull(productsJoin.get("productCode")));
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
