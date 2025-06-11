package org.code.productservices.repositories;

import org.code.productservices.models.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductsRepository extends JpaRepository<Products, String> {

    List<Products> findByProductNameContainingIgnoreCase(String q);

    Page<Products> findByProductNameContainingIgnoreCase(String q, Pageable pageable);
}
