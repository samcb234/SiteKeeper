package com.igt.sitekeeper.boot.service.relationservices;

import com.igt.sitekeeper.model.relationmodels.ProjectsOnSites;
import com.igt.sitekeeper.model.relationmodels.relationshipids.ProjectsOnSitesId;
import com.igt.sitekeeper.repositories.relationrepositories.ProjectsOnSitesRepository;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.ProjectsOnSitesRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProjectsOnSitesService {

    private ProjectsOnSitesRepository projectsOnSitesRepository;

    @Autowired
    public ProjectsOnSitesService(ProjectsOnSitesRepository projectsOnSitesRepository){
        this.projectsOnSitesRepository = projectsOnSitesRepository;
    }

    public List<ProjectsOnSites> getAllProjectsOnSites(){
        return projectsOnSitesRepository.findAll();
    }

    public List<ProjectsOnSites> getProjectsOnSitesBySite(Long site){
        return projectsOnSitesRepository.findProjectsOnSitesBySite(site);
    }

    public void addProjectsOnSites(ProjectsOnSitesRequestModel ProjectsOnSitesRequestModel){
        ProjectsOnSites projectsOnSites = new ProjectsOnSites();

        projectsOnSites.setProject(ProjectsOnSitesRequestModel.getProject());
        projectsOnSites.setSite(ProjectsOnSitesRequestModel.getSite());

        projectsOnSitesRepository.save(projectsOnSites);
    }
}
