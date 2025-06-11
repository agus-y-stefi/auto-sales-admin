package org.code.productservices.dto.products_lines;

public record ProductsLinesCreateRequest(
        String productLine,
        String textDescription
) {
}
