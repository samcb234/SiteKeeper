package com.igt.sitekeeper.model.relationmodels.relationshipids;

import java.io.Serializable;

public class TerminalsOnProjectsId implements Serializable {

    private Long project;
    private Long terminal;

    public Long getProject() {
        return project;
    }

    public void setProject(Long project) {
        this.project = project;
    }

    public Long getSite() {
        return terminal;
    }

    public void setSite(Long site) {
        this.terminal = site;
    }
}
