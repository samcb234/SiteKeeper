package com.igt.sitekeeper.requestmodel.relationrequestmodels;

import lombok.Data;

@Data
public class FeaturesOnSitesRequestModel {
    private Long feature;
    private Long site;
    private String name;
}
