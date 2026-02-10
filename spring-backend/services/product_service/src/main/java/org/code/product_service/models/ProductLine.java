package org.code.product_service.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "productlines")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductLine {
    
    @Id
    @Column(name = "product_line", length = 50)
    private String productLine;
    
    @Column(name = "text_description", length = 4000)
    private String textDescription;
    
    @OneToMany(mappedBy = "productLine", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Product> products;
}
