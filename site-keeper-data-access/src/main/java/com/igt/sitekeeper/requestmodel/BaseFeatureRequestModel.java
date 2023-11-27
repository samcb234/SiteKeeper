package com.igt.sitekeeper.requestmodel;

import lombok.Data;

@Data
public class BaseFeatureRequestModel {
    private String img;
    private String description;
    private double cost;
    private String name;
}
