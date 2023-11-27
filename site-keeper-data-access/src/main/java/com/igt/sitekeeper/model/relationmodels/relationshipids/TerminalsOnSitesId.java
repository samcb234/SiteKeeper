package com.igt.sitekeeper.model.relationmodels.relationshipids;

import java.io.Serializable;

public class TerminalsOnSitesId implements Serializable {
    private Long terminal;
    private Long site;

    public Long getTerminal() {
        return terminal;
    }

    public void setTerminal(Long terminal) {
        this.terminal = terminal;
    }

    public Long getSite() {
        return site;
    }

    public void setSite(Long site) {
        this.site = site;
    }
}
