package com.igt.sitekeeper.requestmodel.relationrequestmodels;

import com.igt.sitekeeper.model.Discipline;
import com.igt.sitekeeper.model.User;
import lombok.Data;

import java.util.List;


@Data
public class DisciplinesOnProjectsRequestModel {
    private Discipline discipline;
    private Long project;
    private Double totalCost;
    private User estimatedBy;
    private boolean verified;
    private User verifiedBy;
    private Long costing;
    private List<User> leadEngineers;

}
