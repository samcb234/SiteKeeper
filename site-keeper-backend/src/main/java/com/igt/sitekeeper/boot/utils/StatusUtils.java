package com.igt.sitekeeper.boot.utils;

import com.igt.sitekeeper.model.Project;
import com.igt.sitekeeper.model.Site;
import com.igt.sitekeeper.repositories.ProjectRepository;
import com.igt.sitekeeper.repositories.ProjectStatusRepository;
import com.igt.sitekeeper.repositories.SiteRepository;

import java.util.List;

public class StatusUtils {
    public static List<Project> projectListStatusChecker(List<Project> projects, ProjectRepository projectRepository, ProjectStatusRepository projectStatusRepository){
        for(Project project: projects){
            statusChecker(project, projectRepository, projectStatusRepository);
        }
        return projects;
    }

    public static Project statusChecker(Project project, ProjectRepository projectRepository, ProjectStatusRepository projectStatusRepository){
        if(project.getStatus() == null){
            project.setStatus(projectStatusRepository.findProjectStatusByStatus("costing").get());
            projectRepository.save(project);
        }
        return project;
    }

    public static List<Site> siteListChecker(List<Site> sites, SiteRepository siteRepository, ProjectRepository projectRepository, ProjectStatusRepository projectStatusRepository){
        for(Site site: sites){
            siteChecker(site, siteRepository, projectRepository, projectStatusRepository);
        }
        return sites;
    }

    public static Site siteChecker(Site site, SiteRepository siteRepository, ProjectRepository projectRepository, ProjectStatusRepository projectStatusRepository){
        projectListStatusChecker(site.getProjects(), projectRepository, projectStatusRepository);
        siteRepository.save(site);
        return site;
    }
}
