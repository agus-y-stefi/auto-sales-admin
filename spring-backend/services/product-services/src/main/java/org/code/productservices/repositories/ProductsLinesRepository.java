package org.code.productservices.repositories;

import org.code.productservices.models.ProductsLines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductsLinesRepository extends JpaRepository<ProductsLines, String> {
}
