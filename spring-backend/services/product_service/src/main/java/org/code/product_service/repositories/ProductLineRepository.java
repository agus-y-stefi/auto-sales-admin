package org.code.product_service.repositories;

import org.code.product_service.models.ProductLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductLineRepository extends JpaRepository<ProductLine, String>, JpaSpecificationExecutor<ProductLine> {
}
