package org.code.product_service.mappers;

import org.code.product_service.dto.ProductDTO;
import org.code.product_service.dto.ProductDtoCreateUpdate;
import org.code.product_service.dto.ProductSummaryDTO;
import org.code.product_service.models.Product;
import org.code.product_service.models.ProductLine;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductMapper {

    public ProductDTO toDto(Product product) {
        if (product == null) {
            return null;
        }

        return ProductDTO.builder()
                .productCode(product.getProductCode())
                .productName(product.getProductName())
                .productLine(product.getProductLine() != null ? 
                    product.getProductLine().getProductLine() : null)
                .productScale(product.getProductScale())
                .productVendor(product.getProductVendor())
                .productDescription(product.getProductDescription())
                .quantityInStock(product.getQuantityInStock())
                .buyPrice(product.getBuyPrice())
                .msrp(product.getMsrp())
                .productLineDescription(product.getProductLine() != null ? 
                    product.getProductLine().getTextDescription() : null)
                .build();
    }

    public ProductSummaryDTO toSummaryDto(Product product) {
        if (product == null) {
            return null;
        }

        return ProductSummaryDTO.builder()
                .productCode(product.getProductCode())
                .productName(product.getProductName())
                .productLine(product.getProductLine() != null ? 
                    product.getProductLine().getProductLine() : null)
                .quantityInStock(product.getQuantityInStock())
                .buyPrice(product.getBuyPrice())
                .msrp(product.getMsrp())
                .productVendor(product.getProductVendor())
                .build();
    }

    public Product toEntity(ProductDTO productDto) {
        if (productDto == null) {
            return null;
        }

        Product.ProductBuilder builder = Product.builder()
                .productCode(productDto.getProductCode())
                .productName(productDto.getProductName())
                .productScale(productDto.getProductScale())
                .productVendor(productDto.getProductVendor())
                .productDescription(productDto.getProductDescription())
                .quantityInStock(productDto.getQuantityInStock())
                .buyPrice(productDto.getBuyPrice())
                .msrp(productDto.getMsrp());

        // El ProductLine se debe setear por separado en el servicio
        return builder.build();
    }

    public Product toEntity(ProductDtoCreateUpdate productDtoCreateUpdate) {
        if (productDtoCreateUpdate == null) {
            return null;
        }

        Product.ProductBuilder builder = Product.builder()
                .productCode(productDtoCreateUpdate.getProductCode())
                .productName(productDtoCreateUpdate.getProductName())
                .productScale(productDtoCreateUpdate.getProductScale())
                .productVendor(productDtoCreateUpdate.getProductVendor())
                .productDescription(productDtoCreateUpdate.getProductDescription())
                .quantityInStock(productDtoCreateUpdate.getQuantityInStock())
                .buyPrice(productDtoCreateUpdate.getBuyPrice())
                .msrp(productDtoCreateUpdate.getMsrp());

        // El ProductLine se debe setear por separado en el servicio
        return builder.build();
    }

    public List<ProductDTO> toDtoList(List<Product> products) {
        if (products == null) {
            return null;
        }

        return products.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<ProductSummaryDTO> toSummaryDtoList(List<Product> products) {
        if (products == null) {
            return null;
        }

        return products.stream()
                .map(this::toSummaryDto)
                .collect(Collectors.toList());
    }

    public List<Product> toEntityList(List<ProductDTO> productDtos) {
        if (productDtos == null) {
            return null;
        }

        return productDtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    public Product mergeUpdate(Product originalProduct, ProductDtoCreateUpdate productToUpdate) {
        if (originalProduct == null || productToUpdate == null) {
            return originalProduct;
        }

        // Actualizar los campos que no son ID
        if (productToUpdate.getProductName() != null) {
            originalProduct.setProductName(productToUpdate.getProductName());
        }
        if (productToUpdate.getProductScale() != null) {
            originalProduct.setProductScale(productToUpdate.getProductScale());
        }
        if (productToUpdate.getProductVendor() != null) {
            originalProduct.setProductVendor(productToUpdate.getProductVendor());
        }
        if (productToUpdate.getProductDescription() != null) {
            originalProduct.setProductDescription(productToUpdate.getProductDescription());
        }
        if (productToUpdate.getQuantityInStock() != null) {
            originalProduct.setQuantityInStock(productToUpdate.getQuantityInStock());
        }
        if (productToUpdate.getBuyPrice() != null) {
            originalProduct.setBuyPrice(productToUpdate.getBuyPrice());
        }
        if (productToUpdate.getMsrp() != null) {
            originalProduct.setMsrp(productToUpdate.getMsrp());
        }
        // El ProductLine se maneja por separado en el servicio

        return originalProduct;
    }
}
