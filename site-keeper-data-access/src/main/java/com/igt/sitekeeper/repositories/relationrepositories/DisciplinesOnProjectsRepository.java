package com.igt.sitekeeper.repositories.relationrepositories;

import com.igt.sitekeeper.model.Costing;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.model.relationmodels.relationshipids.DisciplinesOnProjectsId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DisciplinesOnProjectsRepository extends JpaRepository<DisciplinesOnProjects, DisciplinesOnProjectsId> {

    List<DisciplinesOnProjects> findDisciplinesOnProjectsByProject(Long project);

    Optional<DisciplinesOnProjects> findDisciplinesOnProjectsByCosting(Costing costing);
}
