package com.igt.sitekeeper.model.relationmodels;

import com.igt.sitekeeper.model.relationmodels.relationshipids.TerminalsOnProjectsId;
import com.igt.sitekeeper.model.relationmodels.relationshipids.TerminalsOnSitesId;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "terminals_on_projects")
@Data
@IdClass(TerminalsOnProjectsId.class)
public class TerminalsOnProjects implements Serializable {
    @Id
    @Column(name = "terminal")
    private Long terminal;

    @Id
    @Column(name = "project")
    private Long project;

    @Column(name = "framework")
    private Long framework;
}
