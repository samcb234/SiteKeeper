package com.igt.sitekeeper.model.relationmodels.relationshipids;

import java.io.Serializable;

public class FeaturesOnProjectsId implements Serializable {
    private Long feature;
    private Long project;

    public Long getFeature() {
        return feature;
    }

    public void setFeature(Long feature) {
        this.feature = feature;
    }

    public Long getProject() {
        return project;
    }

    public void setProject(Long project) {
        this.project = project;
    }
}
