package com.igt.sitekeeper.model.relationmodels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igt.sitekeeper.model.Costing;
import com.igt.sitekeeper.model.Discipline;
import com.igt.sitekeeper.model.Project;
import com.igt.sitekeeper.model.User;
import com.igt.sitekeeper.model.relationmodels.relationshipids.DisciplinesOnProjectsId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "disciplines_on_projects")
@Data
@IdClass(DisciplinesOnProjectsId.class)
@NoArgsConstructor
@AllArgsConstructor
public class DisciplinesOnProjects implements Serializable {

    @Id
    @ManyToOne(cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "discipline")
    private Discipline discipline;

    @JsonIgnore
    @Id
    @ManyToOne
    @JoinColumn(name = "project")
    private Project project;

    @Column(name = "total_cost")
    private Double totalCost;

    @ManyToOne
    @JoinColumn(name = "estimated_by")
    private User estimatedBy;

    @Column(name = "verified", columnDefinition = "boolean default false")
    private boolean verified;

    @ManyToOne
    @JoinColumn(name = "verified_by", columnDefinition = "int default null")
    private User verifiedBy;

    @Column(name = "verification_pending", columnDefinition = "boolean default false")
    private boolean verificationPending;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "costing")
    private Costing costing;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(name = "project_discipline_lead_engineers",
    joinColumns = {@JoinColumn(name = "discipline"), @JoinColumn(name = "project")},
    inverseJoinColumns = {@JoinColumn(name = "user")})
    private List<User> leadEngineers;

}
