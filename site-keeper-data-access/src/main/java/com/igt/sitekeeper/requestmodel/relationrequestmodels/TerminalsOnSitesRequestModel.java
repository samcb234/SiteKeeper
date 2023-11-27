package com.igt.sitekeeper.requestmodel.relationrequestmodels;

import com.igt.sitekeeper.model.Framework;
import com.igt.sitekeeper.model.Terminal;
import lombok.Data;

@Data
public class TerminalsOnSitesRequestModel {
    private Terminal terminal;
    private Long site;
    private Framework framework;
    private String bom;
}
