package com.igt.sitekeeper.boot.controller.relationcontrollers;

import com.igt.sitekeeper.boot.service.relationservices.DisciplinesOnProjectsService;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.DisciplinesOnProjectsRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/disciplinesOnProjects")
public class DisciplinesOnProjectsController {

    private DisciplinesOnProjectsService disciplinesOnProjectsService;

    @Autowired
    public DisciplinesOnProjectsController(DisciplinesOnProjectsService disciplinesOnProjectsService){
        this.disciplinesOnProjectsService = disciplinesOnProjectsService;
    }

    @GetMapping("/getAllDisciplinesOnProjects")
    public List<DisciplinesOnProjects> getAllDisciplinesOnProjects(){
        return disciplinesOnProjectsService.getAllDisciplinesOnProjects();
    }

    @GetMapping("/getDisciplinesOnProjectsByProject")
    public List<DisciplinesOnProjects> getDisciplinesOnProjectsByProject(@RequestParam Long project){
        return disciplinesOnProjectsService.getDisciplinesOnProjectsByProject(project);
    }

    @PostMapping("/addDisciplinesOnProjects")
    public void addDisciplinesOnProjects(@RequestBody DisciplinesOnProjectsRequestModel disciplinesOnProjectsRequestModel){
        disciplinesOnProjectsService.addDisciplinesOnProjects(disciplinesOnProjectsRequestModel);
    }
}
