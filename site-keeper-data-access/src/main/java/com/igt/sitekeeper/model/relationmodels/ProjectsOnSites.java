package com.igt.sitekeeper.model.relationmodels;

import com.igt.sitekeeper.model.relationmodels.relationshipids.ProjectsOnSitesId;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "projects_on_sites")
@Data
@IdClass(ProjectsOnSitesId.class)
public class ProjectsOnSites implements Serializable {

    public ProjectsOnSites(){}

    public ProjectsOnSites(Long project, Long site){
        this.project = project;
        this.site = site;
    }


    @Id
    @Column(name = "project")
    private Long project;

    @Id
    @Column(name = "site")
    private Long site;
}
