package com.igt.sitekeeper.requestmodel.relationrequestmodels;

import lombok.Data;

@Data
public class UsersOnSitesRequestModel {
    private Long user;
    private Long site;
    private boolean active;
}
