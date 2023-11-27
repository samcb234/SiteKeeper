package com.igt.sitekeeper.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnSites;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnSites;
import com.igt.sitekeeper.model.relationmodels.TerminalsOnSites;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "site")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Site {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "site_manager")
    private User siteManager;

    @Column(name = "logo", nullable = true)
    private String logo;

    @Column(name = "location")
    private String location;

    @Column(name = "abbreviation", columnDefinition = "varchar(255) default ''")
    private String abbreviation;

    @Column(name = "betslip_id")
    private Double betslipId;

    @OneToMany(mappedBy = "site", cascade = CascadeType.ALL)
    private List<TerminalsOnSites> terminalsOnSites;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "middleware_on_sites",
            joinColumns = {@JoinColumn(name = "site")},
            inverseJoinColumns = {@JoinColumn(name = "middleware")}
    )
    private List<MiddlewareModel> middleware;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "hosts_on_sites",
            joinColumns = {@JoinColumn(name = "site")},
            inverseJoinColumns = {@JoinColumn(name = "host")}
    )
    private List<HostModel> hosts;

    @OneToMany(mappedBy = "site")
    private List<FeaturesOnSites> features;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "users_on_sites",
            joinColumns = {@JoinColumn(name = "site")},
            inverseJoinColumns = {@JoinColumn(name = "user")}
    )
    private List<User> users;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "projects_on_sites",
            joinColumns = {@JoinColumn(name = "site")},
            inverseJoinColumns = @JoinColumn(name = "project")
    )
    private List<Project> projects;

    @OneToMany(mappedBy = "site", cascade = {CascadeType.ALL})
    private List<DisciplinesOnSites> disciplines;
}
