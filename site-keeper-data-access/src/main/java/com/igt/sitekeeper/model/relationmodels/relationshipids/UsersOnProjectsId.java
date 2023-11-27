package com.igt.sitekeeper.model.relationmodels.relationshipids;

import java.io.Serializable;

public class UsersOnProjectsId implements Serializable {
    private Long user;
    private Long project;

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Long getProject() {
        return project;
    }

    public void setProject(Long project) {
        this.project = project;
    }
}
