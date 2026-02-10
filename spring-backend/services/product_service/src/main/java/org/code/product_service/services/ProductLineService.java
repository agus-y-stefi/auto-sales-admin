package org.code.product_service.services;

import lombok.RequiredArgsConstructor;
import org.code.product_service.dto.ProductLineDTO;
import org.code.product_service.dto.ProductLineDtoCreateUpdate;
import org.code.product_service.exceptions.ResourceNotFoundException;
import org.code.product_service.mappers.ProductLineMapper;
import org.code.product_service.models.ProductLine;
import org.code.product_service.repositories.ProductLineRepository;
import org.code.product_service.specifications.ProductLineSpecification;
import org.code.product_service.specifications.criteria.ProductLineSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductLineService {

    private final ProductLineRepository productLineRepository;
    private final ProductLineMapper productLineMapper;

    @Transactional(readOnly = true)
    public Page<ProductLineDTO> getAllProductLines(ProductLineSearchCriteria criteria, Pageable pageable) {
        Specification<ProductLine> spec = ProductLineSpecification.withCriteria(criteria);
        
        if (pageable == null) {
            // Si no se especifica paginación, devolver todos los resultados
            return productLineRepository.findAll(spec, PageRequest.of(0, Integer.MAX_VALUE))
                    .map(productLineMapper::toDto);
        }
        
        return productLineRepository.findAll(spec, pageable)
                .map(productLineMapper::toDto);
    }

    @Transactional(readOnly = true)
    public ProductLineDTO getProductLineById(String productLine) {
        ProductLine entity = productLineRepository.findById(productLine)
                .orElseThrow(() -> new ResourceNotFoundException("ProductLine not found with id: " + productLine));
        return productLineMapper.toDto(entity);
    }

    public ProductLineDTO createProductLine(ProductLineDtoCreateUpdate productLineDto) {
        ProductLine productLine = productLineMapper.toEntity(productLineDto);
        ProductLine savedProductLine = productLineRepository.save(productLine);
        return productLineMapper.toDto(savedProductLine);
    }

    public ProductLineDTO updateProductLine(String productLineId, ProductLineDtoCreateUpdate productLineDto) {
        ProductLine existingProductLine = productLineRepository.findById(productLineId)
                .orElseThrow(() -> new ResourceNotFoundException("ProductLine not found with id: " + productLineId));
        
        ProductLine updatedProductLine = productLineMapper.mergeUpdate(existingProductLine, productLineDto);
        ProductLine savedProductLine = productLineRepository.save(updatedProductLine);
        return productLineMapper.toDto(savedProductLine);
    }

    public void deleteProductLine(String productLineId) {
        if (!productLineRepository.existsById(productLineId)) {
            throw new ResourceNotFoundException("ProductLine not found with id: " + productLineId);
        }
        productLineRepository.deleteById(productLineId);
    }

    public Pageable buildPageable(Integer page, Integer size, String sortBy, String sortDir) {
        if (size == null) {
            return null; // Sin paginación
        }

        int pageNumber = (page != null && page >= 0) ? page : 0;
        int pageSize = Math.max(size, 1);

        Sort sort = Sort.unsorted();
        if (sortBy != null && !sortBy.trim().isEmpty()) {
            Sort.Direction direction = Sort.Direction.ASC;
            if (sortDir != null && sortDir.equalsIgnoreCase("desc")) {
                direction = Sort.Direction.DESC;
            }
            sort = Sort.by(direction, sortBy);
        }

        return PageRequest.of(pageNumber, pageSize, sort);
    }
}
