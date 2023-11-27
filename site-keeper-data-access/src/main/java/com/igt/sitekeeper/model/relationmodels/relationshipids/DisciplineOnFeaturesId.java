package com.igt.sitekeeper.model.relationmodels.relationshipids;

import java.io.Serializable;

public class DisciplineOnFeaturesId implements Serializable {
   Long discipline;
  Long feature;


    public Long getDiscipline() {
        return discipline;
    }

    public void setDiscipline(Long discipline) {
        this.discipline = discipline;
    }

    public Long getFeature() {
        return feature;
    }

    public void setFeature(Long feature) {
        this.feature = feature;
    }
}
