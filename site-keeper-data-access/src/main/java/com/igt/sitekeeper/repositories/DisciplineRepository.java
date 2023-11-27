package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Discipline;
import com.igt.sitekeeper.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

public interface DisciplineRepository extends JpaRepository<Discipline, Long> {

    Optional<Discipline> findDisciplineByType(String type);
    @Query("select o from Discipline o where id in :discipline_ids")
    List<Discipline> findDisciplinesByIdIs(@Param("discipline_ids") List<Long> ids);

    @Query(value = "select * from discipline d left join disciplines_on_projects ds on d.id = ds.discipline where d.type like :name% and not exists(select * from disciplines_on_projects where d.id = disciplines_on_projects.discipline and disciplines_on_projects.project = :projectId)",
            nativeQuery = true)
    List<Discipline> findDisciplinesByStartOfName(@Param("name") String name, @Param("projectId") Long projectId);


    @Query(value = "INSERT INTO discipline_on_features (discipline_id, feature_id) " + "SELECT d.id, f.id FROM discipline d WHERE d.type = :type", nativeQuery = true)
    void addFeatureToDisciplineByType(@Param("type") String type);

    @Query(value = "select * from discipline " +
            "left join disciplines_on_features " +
            "on discipline.id = disciplines_on_features.discipline " +
            "where disciplines_on_features.feature = :featureId", nativeQuery = true)
    List<Discipline> getDisciplinesByFeature(@Param("featureId") Long featureId);
}
