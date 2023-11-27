package com.igt.sitekeeper.requestmodel;

import lombok.Data;

@Data
public class InformationRequestModel {
    private Long disciplineId;
    private Long projectId;
    private String info;
    private String infoName;
}
