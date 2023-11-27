package com.igt.sitekeeper.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnSites;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "contact_info")
    private String contactInfo;

    @Column(name = "fname")
    private String fname;

    @Column(name = "lname")
    private String lname;

    @JsonIgnore
    @Column(name = "password", columnDefinition = "varchar(255) default 'password1234'")
    private String password;

    @ManyToOne
    @JoinColumn(name = "user_role")
    private RoleModel role;

    @Column(name = "contact_date")
    private String contactDate;

    @Column(name = "contact_period", columnDefinition = "int default -1")
    private Long contactPeriod;

    @JsonIgnore
    @ManyToMany(mappedBy = "leadEngineers")
    private List<DisciplinesOnProjects> leadOnProjectDisciplines;

    @JsonIgnore
    @ManyToMany(mappedBy = "leadEngineers")
    private List<DisciplinesOnSites> leadOnSiteDisciplines;
}
