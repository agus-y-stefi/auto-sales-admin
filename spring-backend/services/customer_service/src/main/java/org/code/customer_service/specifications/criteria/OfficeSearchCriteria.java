package org.code.customer_service.specifications.criteria;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OfficeSearchCriteria {

    private String officeCode;
    private String city;
    private String country;
    private String state;
    private String territory;
    private String postalCode;
    private Boolean exactMatch;
}