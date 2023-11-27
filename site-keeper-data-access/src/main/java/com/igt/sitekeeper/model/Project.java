package com.igt.sitekeeper.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnProjects;
import com.igt.sitekeeper.model.relationmodels.UsersOnProjects;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="project")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "name")
    private String name;

    @Column(name = "total_hours")
    private Long totalHours;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "project_manager")
    private User projectManager;

    @Column(name = "costing_id")
    private String costingId;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "similar_projects",
            joinColumns=@JoinColumn(name = "project1"),
            inverseJoinColumns = @JoinColumn(name = "project2"))
    private List<Project> similarProjects;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "terminals_on_projects",
            joinColumns = {@JoinColumn(name = "project")},
            inverseJoinColumns = {@JoinColumn(name = "terminal")}
    )
    private List<Terminal> terminals;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "terminals_on_projects",
            joinColumns = {@JoinColumn(name = "project")},
            inverseJoinColumns = {@JoinColumn(name = "framework")}
    )
    private List<Framework> frameworks;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "middleware_on_projects",
            joinColumns = {@JoinColumn(name = "project")},
            inverseJoinColumns = {@JoinColumn(name = "middleware")}
    )
    private List<MiddlewareModel> middleware;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "hosts_on_projects",
            joinColumns = {@JoinColumn(name = "project")},
            inverseJoinColumns = {@JoinColumn(name = "host")}
    )
    private List<HostModel> hosts;

    @OneToMany(mappedBy = "project")
    private List<FeaturesOnProjects> features;

    @OneToMany(mappedBy = "project", cascade = {CascadeType.PERSIST})
    private List<DisciplinesOnProjects> disciplines;

    @OneToMany(mappedBy = "projectId")
    private List<Information> information;

    @OneToMany(mappedBy = "project")
    private List<UsersOnProjects> users;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "status")
    private ProjectStatus status;


}
