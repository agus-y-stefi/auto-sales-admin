package org.code.customer_service.repositories;

import org.code.customer_service.models.Office;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface OfficeRepository extends JpaRepository<Office, String>, JpaSpecificationExecutor<Office> {
    // Los métodos básicos y de especificaciones están disponibles automáticamente
}