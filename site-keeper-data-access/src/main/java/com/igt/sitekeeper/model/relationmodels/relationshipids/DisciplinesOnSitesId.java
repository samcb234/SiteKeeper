package com.igt.sitekeeper.model.relationmodels.relationshipids;

import java.io.Serializable;

public class DisciplinesOnSitesId implements Serializable {
    private Long discipline;
    private Long site;

    public Long getDiscipline() {
        return discipline;
    }

    public void setDiscipline(Long discipline) {
        this.discipline = discipline;
    }

    public Long getSite() {
        return site;
    }

    public void setSite(Long site) {
        this.site = site;
    }
}
