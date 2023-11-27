package com.igt.sitekeeper.model.relationmodels.relationshipids;

import java.io.Serializable;

public class FeaturesOnSitesId implements Serializable {
    private Long feature;
    private Long site;

    public Long getFeature() {
        return feature;
    }

    public void setFeature(Long feature) {
        this.feature = feature;
    }

    public Long getSite() {
        return site;
    }

    public void setSite(Long site) {
        this.site = site;
    }
}
