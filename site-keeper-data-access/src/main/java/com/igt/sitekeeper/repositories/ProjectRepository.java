package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Project;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("select o from Project o where id in :project_ids")
    List<Project> findProjectsByIdIs(@Param("project_ids") List<Long> ids);

    @Query(value = "select * from project " +
            "left join features_on_projects " +
            "on project.id = features_on_projects.project " +
            "where features_on_projects.feature = :featureId", nativeQuery = true)
    List<Project> findProjectsByFeature(@Param("featureId") Long featureId);

    @Query(value = "select * from disciplines_on_projects " +
            "where disciplines_on_projects.costing = :costingId", nativeQuery = true)
    Optional<DisciplinesOnProjects> getDisciplineByCosting(@Param("costingId") Long costing);

}
