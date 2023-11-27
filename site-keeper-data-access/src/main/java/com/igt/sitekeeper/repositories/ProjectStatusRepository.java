package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectStatusRepository extends JpaRepository<ProjectStatus, Long> {
    Optional<ProjectStatus> findProjectStatusByStatus(String status);

}
