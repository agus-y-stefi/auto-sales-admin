package org.code.customer_service.specifications.criteria;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmployeeSearchCriteria {
    
    private String firstName;
    private String lastName;
    private String extension;
    private String officeCode;
    private Boolean exactMatch;
}