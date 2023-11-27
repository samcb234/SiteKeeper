package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.ProjectService;
import com.igt.sitekeeper.boot.utils.RoleUtils;
import com.igt.sitekeeper.model.*;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.requestmodel.ProjectRequestModel;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.DisciplinesOnProjectsRequestModel;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.FeaturesOnProjectsRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(originPatterns = "${cors.allowed.url}", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping(value="/api/project")
public class ProjectController {

    private ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService){
        this.projectService = projectService;
    }

    @GetMapping("/getAllProjects")
    public List<Project> getAllProjects(){
        return projectService.getAllProjects();
    }

    @GetMapping("/getProjectById")
    public Project getProjectById(@RequestParam Long id) throws Exception{
        return projectService.getProjectById(id);
    }

    @GetMapping("/getProjectsByIds")
    public List<Project> getProjectsByIds(@RequestParam List<Long> ids){
        return projectService.getProjectsByIds(ids);
    }

    @GetMapping("/getDisciplinesByProjectId")
    public List<DisciplinesOnProjects> getDisciplinesByProject(@RequestParam Long id) throws Exception{
        return projectService.getDisciplinesOnProjectsById(id);
    }

    @GetMapping("/getProjectsByFeature")
    public List<Project> getProjectsByFeature(@RequestParam Long featureId){
        return projectService.getProjectsByFeature(featureId);
    }

    @GetMapping("getEstimateBasedOnSimilarProjects")
    public int getEstimateBasedOnSimilarProjects(@RequestParam Long projectId) throws Exception{
        return projectService.createEstimateBasedOnSimilarProjects(projectId);
    }

    @GetMapping("/getDisciplineEstimations")
    public HashMap<Integer, Integer> getDisciplineEstimations(@RequestParam Long projectId) throws Exception{
        return projectService.getDisciplineEstimations(projectId);
    }

    @RolesAllowed({RoleUtils.ADMIN})
    @PostMapping("/addNewProject")
    public Project addNewProject(@RequestBody ProjectRequestModel projectRequestModel, @RequestParam Long siteId) throws Exception{
        return projectService.addNewProject(projectRequestModel, siteId);
    }
    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PostMapping("/associateAdditionalFeature")
    public void associateAdditionalFeature(@RequestBody FeaturesOnProjectsRequestModel featuresOnProjectsRequestModel) throws Exception{
        projectService.addNewFeaturesOnProjects(featuresOnProjectsRequestModel);
    }
    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER})
    @PostMapping("/associateNewDiscipline")
    public void associateNewDiscipline(@RequestBody DisciplinesOnProjectsRequestModel disciplinesOnProjectsRequestModel){
        projectService.addNewDisciplineOnProject(disciplinesOnProjectsRequestModel);
    }
    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER, RoleUtils.USER})
    @PutMapping("/updateProject")
    public void updateProject(@RequestParam Long id, @RequestBody ProjectRequestModel projectRequestModel) throws Exception {
        projectService.updateProject(id, projectRequestModel);
    }
    @RolesAllowed({RoleUtils.ADMIN})
    @DeleteMapping("/deleteProject")
    public void deleteProject(@RequestParam Long id) throws Exception{
        projectService.deleteProject(id);
    }

    @GetMapping("/getSimilarProjects")
    public List<Project> getSimilarProjects(@RequestParam Long id)throws Exception{
        return projectService.getSimilarProjects(id);
    }
    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER})
    @PutMapping("/addSimilarProjects")
    public void addSimilarProject(@RequestParam Long projectId, @RequestParam List<Long> similarProjects) throws Exception{
        projectService.addSimilarProject(projectId, similarProjects);
    }

    @GetMapping("/getNonSimilarProjects")
    public List<Project> getNonSimilarProjects(@RequestParam Long projectId) throws Exception{
        return projectService.getNonSimilarProjects(projectId);
    }

    @GetMapping("/getUnaddedDisciplines")
    public List<Discipline> getUnaddedDisciplines(@RequestParam Long projectId) throws Exception {
        return projectService.getUnAddedDisciplines(projectId);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER})
    @PutMapping("/removeSimilarProject")
    public void removeSimilarProject(@RequestParam Long projectId, @RequestParam Long projectToRemove) throws Exception{
        projectService.removeSimilarProject(projectId, projectToRemove);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PutMapping("/verifyDiscipline")
    public void verifyDiscipline(@RequestParam Long projectId, @RequestParam Long disciplineId, @RequestParam Long userId) throws Exception{
        projectService.verifyDiscipline(projectId, disciplineId, userId);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER})
    @PutMapping("/requestVerification")
    public void requestVerification(@RequestParam Long projectId, @RequestParam Long disciplineId) throws Exception{
        projectService.requestVerification(projectId, disciplineId);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER})
    @PutMapping("/removeLeadEngineer")
    public void removeLeadEngineer(@RequestParam Long projectId, @RequestParam String discipline, @RequestParam Long userId) throws Exception{
        projectService.removeLeadEngineer(projectId, discipline, userId);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER})
    @PutMapping("/addLeadEngineer")
    public void addLeadEngineer(@RequestParam Long projectId, @RequestParam String discipline, @RequestParam String email) throws Exception{
        projectService.addLeadEngineer(projectId, discipline, email);
    }

    @PostMapping("/getCameleonInfo")
    public  ResponseEntity<Resource> getCameleonInfo(@RequestBody Project project, HttpServletResponse response) throws Exception {
        File resultingFile = projectService.getCameleonCosting(project.getCostingId());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + resultingFile.getName() + ".xls")
                .body(new ByteArrayResource(Files.readAllBytes(Paths.get(resultingFile.getName()))));
    }

    @GetMapping("/getAllStatus")
    public List<ProjectStatus> getAllStatus(){
        return projectService.getAllStatus();
    }
}
