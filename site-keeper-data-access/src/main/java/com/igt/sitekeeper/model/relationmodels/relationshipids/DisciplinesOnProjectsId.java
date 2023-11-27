package com.igt.sitekeeper.model.relationmodels.relationshipids;

import java.io.Serializable;

public class DisciplinesOnProjectsId implements Serializable {
    private Long discipline;
    private Long project;

    public Long getDiscipline() {
        return discipline;
    }

    public void setDiscipline(Long discipline) {
        this.discipline = discipline;
    }

    public Long getProject() {
        return project;
    }

    public void setProject(Long project) {
        this.project = project;
    }
}
