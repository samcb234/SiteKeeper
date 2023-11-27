package com.igt.sitekeeper.requestmodel;

import com.igt.sitekeeper.model.Discipline;
import com.igt.sitekeeper.model.Feature;
import lombok.Data;

import java.util.List;

@Data
public class FeatureRequestModel {
    private Long id;
    private String img;
    private String description;
    private String name;
    private boolean verifiedByEngineer;
    private List<Discipline> disciplines;
    private Feature parentFeature;
}
