package com.igt.sitekeeper.boot.controller.relationcontrollers;

import com.igt.sitekeeper.boot.service.relationservices.ProjectsOnSitesService;
import com.igt.sitekeeper.model.relationmodels.ProjectsOnSites;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.ProjectsOnSitesRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/projectsOnSites")
public class ProjectsOnSitesController {

    private ProjectsOnSitesService projectsOnSitesService;

    @Autowired
    public ProjectsOnSitesController(ProjectsOnSitesService projectsOnSitesService){
        this.projectsOnSitesService = projectsOnSitesService;
    }

    @GetMapping("/getAllProjectsOnSites")
    public List<ProjectsOnSites> getAllProjectsOnSites(){
        return projectsOnSitesService.getAllProjectsOnSites();
    }

    @GetMapping("/getProjectsOnSitesBySite")
    public List<ProjectsOnSites> getAllProjectsOnSitesBySite(@RequestParam Long site){
        return projectsOnSitesService.getProjectsOnSitesBySite(site);
    }

    @PostMapping("/addProjectsOnSites")
    public void addProjectsOnSites(@RequestBody ProjectsOnSitesRequestModel projectsOnSitesRequestModel){
        projectsOnSitesService.addProjectsOnSites(projectsOnSitesRequestModel);
    }
}
