package com.igt.sitekeeper.requestmodel;

import com.igt.sitekeeper.model.Costing;
import com.igt.sitekeeper.model.User;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnSites;
import com.igt.sitekeeper.model.relationmodels.TerminalsOnSites;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.TerminalsOnSitesRequestModel;
import lombok.Data;

import java.util.List;

@Data
public class SiteRequestModel {

    private String name;
    private User siteManager;
    private String logo;
    private String location;
    private String abbreviation;
    private Double betslipId;
    private List<TerminalsOnSitesRequestModel> terminalsOnSites;
    private List<DisciplinesOnSites> disciplines;
}
