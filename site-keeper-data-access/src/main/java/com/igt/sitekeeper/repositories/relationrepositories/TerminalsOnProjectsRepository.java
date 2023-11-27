package com.igt.sitekeeper.repositories.relationrepositories;

import com.igt.sitekeeper.model.relationmodels.TerminalsOnProjects;
import com.igt.sitekeeper.model.relationmodels.relationshipids.TerminalsOnProjectsId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TerminalsOnProjectsRepository extends JpaRepository<TerminalsOnProjects, TerminalsOnProjectsId> {

    List<TerminalsOnProjects> findTerminalsOnProjectsByProject(Long project);
}
