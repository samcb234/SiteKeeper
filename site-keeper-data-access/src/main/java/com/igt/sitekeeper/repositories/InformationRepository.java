package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Information;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InformationRepository extends JpaRepository<Information, Long> {

    List<Information> findInformationByDisciplineIdAndProjectId(Long disciplineId, Long projectId);

    List<Information> findInformationByProjectId(Long projectId);
}
