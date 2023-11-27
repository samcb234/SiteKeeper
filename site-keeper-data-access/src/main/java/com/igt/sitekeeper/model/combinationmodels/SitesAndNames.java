package com.igt.sitekeeper.model.combinationmodels;

import com.igt.sitekeeper.model.Site;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


@Data
public class SitesAndNames {

    private Long id;
    private String name;
    private Long siteManager;
    private String logo;
    private String location;
    private String terminalName;
}
