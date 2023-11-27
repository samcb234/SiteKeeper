package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.DisciplineService;
import com.igt.sitekeeper.boot.utils.RoleUtils;
import com.igt.sitekeeper.model.Discipline;
import com.igt.sitekeeper.requestmodel.DisciplineRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/api/discipline")
public class DisciplineController {

    private DisciplineService disciplineService;

    @Autowired
    public DisciplineController(DisciplineService disciplineService){
        this.disciplineService = disciplineService;
    }

    @GetMapping("/getAllDisciplines")
    public List<Discipline> getAllDisciplines(){
        return disciplineService.getAllDisciplines();
    }

    @GetMapping("/getDiscipline")
    public Discipline getDiscipline(@RequestParam Long id) throws Exception{
        return disciplineService.getDisciplineById(id);
    }

    @GetMapping("/getDisciplinesByIds")
    public List<Discipline> getDisciplinesByIds(@RequestParam List<Long> ids){
        return disciplineService.getDisciplinesByIds(ids);
    }

    @GetMapping("/getDisciplinesByStartOfName")
    public List<Discipline> getDisciplinesByStartOfName(@RequestParam String type, @RequestParam Long projectId){
        return disciplineService.getDisciplinesByStartOfType(type, projectId);
    }


    @GetMapping("/getDisciplinesByFeature")
    public List<Discipline> getDisciplinesByFeature(@RequestParam Long featureId){
        return disciplineService.getDisciplinesByFeature(featureId);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER})
    @PostMapping("/addNewDiscipline")
    public Discipline addNewDiscipline(@RequestBody DisciplineRequestModel disciplineRequestModel) throws Exception{
        return disciplineService.addNewDiscipline(disciplineRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PutMapping("/updateDiscipline")
    public void updateDiscipline(@RequestParam Long id, @RequestBody DisciplineRequestModel disciplineRequestModel) throws Exception {
        disciplineService.updateDiscipline(id, disciplineRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN})
    @DeleteMapping("/deleteDiscipline")
    public void deleteDiscipline(@RequestParam Long id) throws Exception{
        disciplineService.deleteDiscipline(id);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PostMapping("/addNewDisciplineByFeature")
    public void addNewFeatureToDiscipline(@RequestBody DisciplineRequestModel discipline){
        disciplineService.addFeatureToDisciplineByType(discipline.getType());
    }
}
