package com.igt.sitekeeper.requestmodel;

import com.igt.sitekeeper.model.Feature;
import com.igt.sitekeeper.model.ProjectStatus;
import com.igt.sitekeeper.model.User;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnProjects;
import lombok.Data;

import java.util.List;

@Data
public class ProjectRequestModel {
    private String startDate;
    private String endDate;
    private String name;
    private Long totalHours;
    private User projectManager;
    private String costingId;
    private List<Long> similarProjects;
    private List<FeaturesOnProjects> features;
    private List<DisciplinesOnProjects> disciplines;
    private ProjectStatus status;
}
