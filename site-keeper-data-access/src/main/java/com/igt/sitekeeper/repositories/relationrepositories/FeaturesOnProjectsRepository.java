package com.igt.sitekeeper.repositories.relationrepositories;

import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnProjects;
import com.igt.sitekeeper.model.relationmodels.relationshipids.FeaturesOnProjectsId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeaturesOnProjectsRepository extends JpaRepository<FeaturesOnProjects, FeaturesOnProjectsId> {

    List<FeaturesOnProjects> findFeaturesOnProjectsByProject(Long project);
}
