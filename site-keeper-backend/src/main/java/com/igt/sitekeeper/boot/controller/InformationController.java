package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.InformationService;
import com.igt.sitekeeper.boot.utils.RoleUtils;
import com.igt.sitekeeper.model.Information;
import com.igt.sitekeeper.requestmodel.InformationRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin(originPatterns = "${cors.allowed.url}", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping(value="/api/information")
public class InformationController {

    @Autowired
    private InformationService informationService;

    public InformationController(){}

    @GetMapping("/getAllInformation")
    public List<Information> getAllInformation(){
        return informationService.getAllInformation();
    }

    @GetMapping("/getInformationById")
    public Information getInformationById(@RequestParam Long id) throws Exception{
        return informationService.getInformationById(id);
    }

    @GetMapping("/getInformationByDisciplineAndProject")
    public List<Information> getInformationByDisciplineAndProject(@RequestParam Long discipline, @RequestParam Long project){
        return informationService.getInformationByDisciplineAndProject(discipline, project);
    }

    @GetMapping("/getInformationByProject")
    public List<Information> getInformationByProject(@RequestParam Long projectId){
        return informationService.getInformationByProject(projectId);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PostMapping("/addNewInformation")
    public void addNewInformation(@RequestBody InformationRequestModel informationRequestModel){
        informationService.addNewInformation(informationRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PutMapping("/updateInformation")
    public void updateInformation(@RequestParam Long id, @RequestBody InformationRequestModel informationRequestModel) throws Exception{
        informationService.updateInformation(informationRequestModel, id);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @DeleteMapping("/deleteInformation")
    public void deleteInformation(@RequestParam Long id) throws Exception{
        informationService.deleteInformation(id);
    }
}
