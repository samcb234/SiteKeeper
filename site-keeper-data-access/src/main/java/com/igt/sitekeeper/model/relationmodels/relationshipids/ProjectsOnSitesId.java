package com.igt.sitekeeper.model.relationmodels.relationshipids;

import java.io.Serializable;

public class ProjectsOnSitesId implements Serializable {
    private Long project;
    private Long site;

    public Long getProject() {
        return project;
    }

    public void setProject(Long project) {
        this.project = project;
    }

    public Long getSite() {
        return site;
    }

    public void setSite(Long site) {
        this.site = site;
    }
}
