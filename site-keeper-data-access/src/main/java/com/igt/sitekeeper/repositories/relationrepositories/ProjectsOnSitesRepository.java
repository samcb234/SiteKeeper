package com.igt.sitekeeper.repositories.relationrepositories;

import com.igt.sitekeeper.model.relationmodels.ProjectsOnSites;
import com.igt.sitekeeper.model.relationmodels.relationshipids.ProjectsOnSitesId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectsOnSitesRepository extends JpaRepository<ProjectsOnSites, ProjectsOnSitesId> {
    public List<ProjectsOnSites> findProjectsOnSitesBySite(Long site);

    List<ProjectsOnSites> findProjectsOnSitesByProject(Long project);
}
