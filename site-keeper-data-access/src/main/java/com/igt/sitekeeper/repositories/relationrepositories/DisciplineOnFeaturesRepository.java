package com.igt.sitekeeper.repositories.relationrepositories;

import com.igt.sitekeeper.model.relationmodels.DisciplineOnFeatures;
import com.igt.sitekeeper.model.relationmodels.DisciplineOnFeatures;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.model.relationmodels.relationshipids.DisciplinesOnProjectsId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DisciplineOnFeaturesRepository  extends JpaRepository<DisciplineOnFeatures, DisciplinesOnProjectsId> {
    List<DisciplineOnFeatures> findDisciplineOnFeaturesByDiscipline(Long discipline);




}
