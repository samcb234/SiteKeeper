package com.igt.sitekeeper.requestmodel;

import lombok.Data;

@Data
public class UserRequestModel {

    private String contactInfo;
    private String fname;
    private String lname;
    private Long role;
    private String contactDate;
    private Long contactPeriod;
}

