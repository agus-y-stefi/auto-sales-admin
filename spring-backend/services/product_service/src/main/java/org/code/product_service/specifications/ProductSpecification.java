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

            // Búsqueda por product code
            if (criteria.getProductCode() != null && !criteria.getProductCode().trim().isEmpty()) {
                if (criteria.getExactMatch() != null && criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            root.get("productCode"), criteria.getProductCode().trim()));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("productCode")),
                            "%" + criteria.getProductCode().trim().toLowerCase() + "%"));
                }
            }

            // Búsqueda por product name
            if (criteria.getProductName() != null && !criteria.getProductName().trim().isEmpty()) {
                if (criteria.getExactMatch() != null && criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            root.get("productName"), criteria.getProductName().trim()));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("productName")),
                            "%" + criteria.getProductName().trim().toLowerCase() + "%"));
                }
            }

            // Búsqueda por product line
            if (criteria.getProductLine() != null && !criteria.getProductLine().trim().isEmpty()) {
                var productLineJoin = root.join("productLine");
                if (criteria.getExactMatch() != null && criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            productLineJoin.get("productLine"), criteria.getProductLine().trim()));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(productLineJoin.get("productLine")),
                            "%" + criteria.getProductLine().trim().toLowerCase() + "%"));
                }
            }

            // Búsqueda por product scale
            if (criteria.getProductScale() != null && !criteria.getProductScale().trim().isEmpty()) {
                if (criteria.getExactMatch() != null && criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            root.get("productScale"), criteria.getProductScale().trim()));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("productScale")),
                            "%" + criteria.getProductScale().trim().toLowerCase() + "%"));
                }
            }

            // Búsqueda por product vendor
            if (criteria.getProductVendor() != null && !criteria.getProductVendor().trim().isEmpty()) {
                if (criteria.getExactMatch() != null && criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            root.get("productVendor"), criteria.getProductVendor().trim()));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("productVendor")),
                            "%" + criteria.getProductVendor().trim().toLowerCase() + "%"));
                }
            }

            // Búsqueda por description
            if (criteria.getProductDescription() != null && !criteria.getProductDescription().trim().isEmpty()) {
                if (criteria.getExactMatch() != null && criteria.getExactMatch()) {
                    predicates.add(criteriaBuilder.equal(
                            root.get("productDescription"), criteria.getProductDescription().trim()));
                } else {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("productDescription")),
                            "%" + criteria.getProductDescription().trim().toLowerCase() + "%"));
                }
            }

            // Filtros por cantidad en stock
            if (criteria.getMinQuantityInStock() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("quantityInStock"), criteria.getMinQuantityInStock()));
            }

            if (criteria.getMaxQuantityInStock() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("quantityInStock"), criteria.getMaxQuantityInStock()));
            }

            // Filtro para productos en stock
            if (criteria.getInStock() != null) {
                if (criteria.getInStock()) {
                    predicates.add(criteriaBuilder.greaterThan(root.get("quantityInStock"), (short) 0));
                } else {
                    predicates.add(criteriaBuilder.or(
                            criteriaBuilder.isNull(root.get("quantityInStock")),
                            criteriaBuilder.equal(root.get("quantityInStock"), (short) 0)
                    ));
                }
            }

            // Filtros por buy price
            if (criteria.getMinBuyPrice() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("buyPrice"), criteria.getMinBuyPrice()));
            }

            if (criteria.getMaxBuyPrice() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("buyPrice"), criteria.getMaxBuyPrice()));
            }

            // Filtros por MSRP
            if (criteria.getMinMsrp() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("msrp"), criteria.getMinMsrp()));
            }

            if (criteria.getMaxMsrp() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("msrp"), criteria.getMaxMsrp()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
