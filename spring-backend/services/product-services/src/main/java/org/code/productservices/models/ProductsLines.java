package org.code.productservices.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "product_lines")
public class ProductsLines {

    @Id
    @Column(name = "product_line")
    private String productLine;

    @Column(name="text_description")
    private String textDescription;

}
