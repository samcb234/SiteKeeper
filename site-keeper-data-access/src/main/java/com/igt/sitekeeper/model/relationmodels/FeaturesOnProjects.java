package com.igt.sitekeeper.model.relationmodels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igt.sitekeeper.model.Feature;
import com.igt.sitekeeper.model.Project;
import com.igt.sitekeeper.model.relationmodels.relationshipids.FeaturesOnProjectsId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "features_on_projects")
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(FeaturesOnProjectsId.class)
public class FeaturesOnProjects implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "feature")
    private Feature feature;

    @JsonIgnore
    @Id
    @ManyToOne
    @JoinColumn(name = "project")
    private Project project;

    @Column(name = "name", columnDefinition = "varchar(255) not null default ''")
    private String name;
}
