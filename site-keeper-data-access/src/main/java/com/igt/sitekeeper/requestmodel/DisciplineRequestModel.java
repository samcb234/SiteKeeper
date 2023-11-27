package com.igt.sitekeeper.requestmodel;

import lombok.Data;

@Data
public class DisciplineRequestModel {
    private String type;
    private Long leadEngineer;
    private Double totalCost;
    private Long estimatedBy;
    private boolean verified;
    private Long verifiedBy;
}
