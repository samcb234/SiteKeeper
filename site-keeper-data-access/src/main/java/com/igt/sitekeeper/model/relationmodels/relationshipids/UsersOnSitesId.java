package com.igt.sitekeeper.model.relationmodels.relationshipids;

import java.io.Serializable;

public class UsersOnSitesId implements Serializable {
    private Long user;
    private Long site;

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Long getSite() {
        return site;
    }

    public void setSite(Long site) {
        this.site = site;
    }
}
