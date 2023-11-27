package com.igt.sitekeeper.model.relationmodels;

import com.igt.sitekeeper.model.relationmodels.relationshipids.DisciplineOnFeaturesId;
import com.igt.sitekeeper.model.relationmodels.relationshipids.DisciplinesOnProjectsId;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

import javax.persistence.*;


@Entity
@Table(name = "disciplines_on_features")
@Data
@IdClass(DisciplineOnFeaturesId.class)
public class DisciplineOnFeatures implements Serializable {

    @Id
    @Column(name = "discipline")
    private Long discipline;

    @Id
    @Column(name = "feature")
    private Long feature;

    public DisciplineOnFeatures(){}

    public DisciplineOnFeatures(Long discipline, Long feature){
        this.discipline = discipline;
        this.feature = feature;
    }
}
