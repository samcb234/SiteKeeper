package com.igt.sitekeeper.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import lombok.AllArgsConstructor;
import lombok.Cleanup;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "feature")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Feature {

    public Feature(Feature feature){
        this.id = feature.getId();
        this.name = feature.getName();
        this.img = feature.getImg();
        this.description = feature.getDescription();
        this.verifiedByEngineer = feature.isVerifiedByEngineer();
        this.disciplines = feature.getDisciplines();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "img", columnDefinition = "mediumblob default null")
    private String img;

    @Column(name = "description")
    private String description;

    @Column(name = "name")
    private String name;

    @Column(name = "verified_by_engineer", columnDefinition = "boolean default false")
    private boolean verifiedByEngineer;

    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "disciplines_on_features",
            joinColumns = {@JoinColumn(name = "feature")},
            inverseJoinColumns = {@JoinColumn(name = "discipline")}
    )
    private List<Discipline> disciplines;

    @ManyToOne
    @JoinColumn(name = "parent_feature")
    private Feature parentFeature;

    @JsonIgnore
    @OneToMany(mappedBy = "parentFeature")
    private List<Feature> childFeatures;
}
