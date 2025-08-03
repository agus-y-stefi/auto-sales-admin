package org.code.product_service.services;

import lombok.RequiredArgsConstructor;
import org.code.product_service.dto.ProductDTO;
import org.code.product_service.dto.ProductDtoCreateUpdate;
import org.code.product_service.dto.ProductSummaryDTO;
import org.code.product_service.exceptions.ResourceNotFoundException;
import org.code.product_service.mappers.ProductMapper;
import org.code.product_service.models.Product;
import org.code.product_service.models.ProductLine;
import org.code.product_service.repositories.ProductRepository;
import org.code.product_service.repositories.ProductLineRepository;
import org.code.product_service.specifications.ProductSpecification;
import org.code.product_service.specifications.criteria.ProductSearchCriteria;
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
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductLineRepository productLineRepository;
    private final ProductMapper productMapper;

    @Transactional(readOnly = true)
    public Page<ProductDTO> getAllProducts(ProductSearchCriteria criteria, Pageable pageable) {
        Specification<Product> spec = ProductSpecification.withCriteria(criteria);
        
        if (pageable == null) {
            // Si no se especifica paginación, devolver todos los resultados
            return productRepository.findAll(spec, PageRequest.of(0, Integer.MAX_VALUE))
                    .map(productMapper::toDto);
        }
        
        return productRepository.findAll(spec, pageable)
                .map(productMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Page<ProductSummaryDTO> getAllProductsSummary(ProductSearchCriteria criteria, Pageable pageable) {
        Specification<Product> spec = ProductSpecification.withCriteria(criteria);
        
        if (pageable == null) {
            return productRepository.findAll(spec, PageRequest.of(0, Integer.MAX_VALUE))
                    .map(productMapper::toSummaryDto);
        }
        
        return productRepository.findAll(spec, pageable)
                .map(productMapper::toSummaryDto);
    }

    @Transactional(readOnly = true)
    public ProductDTO getProductById(String productCode) {
        Product product = productRepository.findById(productCode)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with code: " + productCode));
        return productMapper.toDto(product);
    }

    public ProductDTO createProduct(ProductDtoCreateUpdate productDto) {
        // Verificar que la línea de producto existe
        ProductLine productLine = productLineRepository.findById(productDto.getProductLine())
                .orElseThrow(() -> new ResourceNotFoundException("ProductLine not found: " + productDto.getProductLine()));

        Product product = productMapper.toEntity(productDto);
        product.setProductLine(productLine);
        
        Product savedProduct = productRepository.save(product);
        return productMapper.toDto(savedProduct);
    }

    public ProductDTO updateProduct(String productCode, ProductDtoCreateUpdate productDto) {
        Product existingProduct = productRepository.findById(productCode)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with code: " + productCode));
        
        // Si se está actualizando la línea de producto, verificar que existe
        if (productDto.getProductLine() != null && 
            !productDto.getProductLine().equals(existingProduct.getProductLine().getProductLine())) {
            ProductLine newProductLine = productLineRepository.findById(productDto.getProductLine())
                    .orElseThrow(() -> new ResourceNotFoundException("ProductLine not found: " + productDto.getProductLine()));
            existingProduct.setProductLine(newProductLine);
        }

        Product updatedProduct = productMapper.mergeUpdate(existingProduct, productDto);
        Product savedProduct = productRepository.save(updatedProduct);
        return productMapper.toDto(savedProduct);
    }

    public void deleteProduct(String productCode) {
        if (!productRepository.existsById(productCode)) {
            throw new ResourceNotFoundException("Product not found with code: " + productCode);
        }
        productRepository.deleteById(productCode);
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
