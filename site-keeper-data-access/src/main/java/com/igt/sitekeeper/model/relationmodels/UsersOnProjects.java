package com.igt.sitekeeper.model.relationmodels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igt.sitekeeper.model.Discipline;
import com.igt.sitekeeper.model.Project;
import com.igt.sitekeeper.model.User;
import com.igt.sitekeeper.model.relationmodels.relationshipids.UsersOnProjectsId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users_on_projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(UsersOnProjectsId.class)
public class UsersOnProjects implements Serializable {

    @Id
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "user")
    private User user;

    @Id
    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "project")
    private Project project;

    @Column(name = "active")
    private boolean active;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "discipline")
    private Discipline discipline;

}
