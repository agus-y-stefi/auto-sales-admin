package org.code.product_service.mappers;

import org.code.product_service.dto.ProductLineDTO;
import org.code.product_service.dto.ProductLineDtoCreateUpdate;
import org.code.product_service.models.ProductLine;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductLineMapper {

    public ProductLineDTO toDto(ProductLine productLine) {
        if (productLine == null) {
            return null;
        }

        return ProductLineDTO.builder()
                .productLine(productLine.getProductLine())
                .textDescription(productLine.getTextDescription())
                .productCount(productLine.getProducts() != null ? 
                    (long) productLine.getProducts().size() : 0L)
                .build();
    }

    public ProductLine toEntity(ProductLineDTO productLineDto) {
        if (productLineDto == null) {
            return null;
        }

        return ProductLine.builder()
                .productLine(productLineDto.getProductLine())
                .textDescription(productLineDto.getTextDescription())
                .build();
    }

    public ProductLine toEntity(ProductLineDtoCreateUpdate productLineDtoCreateUpdate) {
        if (productLineDtoCreateUpdate == null) {
            return null;
        }

        return ProductLine.builder()
                .productLine(productLineDtoCreateUpdate.getProductLine())
                .textDescription(productLineDtoCreateUpdate.getTextDescription())
                .build();
    }

    public List<ProductLineDTO> toDtoList(List<ProductLine> productLines) {
        if (productLines == null) {
            return null;
        }

        return productLines.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<ProductLine> toEntityList(List<ProductLineDTO> productLineDtos) {
        if (productLineDtos == null) {
            return null;
        }

        return productLineDtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    public ProductLine mergeUpdate(ProductLine originalProductLine, ProductLineDtoCreateUpdate productLineToUpdate) {
        if (originalProductLine == null || productLineToUpdate == null) {
            return originalProductLine;
        }

        // Actualizar los campos que no son ID
        if (productLineToUpdate.getTextDescription() != null) {
            originalProductLine.setTextDescription(productLineToUpdate.getTextDescription());
        }

        return originalProductLine;
    }
}
