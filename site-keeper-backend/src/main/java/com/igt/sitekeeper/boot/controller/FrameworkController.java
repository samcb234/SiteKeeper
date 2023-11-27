package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.FrameworkService;
import com.igt.sitekeeper.boot.utils.RoleUtils;
import com.igt.sitekeeper.model.Framework;
import com.igt.sitekeeper.requestmodel.FrameworkRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/api/framework")
public class FrameworkController {

    private FrameworkService frameworkService;

    @Autowired
    public FrameworkController(FrameworkService frameworkService){
        this.frameworkService = frameworkService;
    }

    @GetMapping("/getAllFrameworks")
    public List<Framework> getAllFrameworks(){
        return frameworkService.getAllFrameworks();
    }

    @GetMapping("/getFrameworksBySite")
    public List<Framework> getFrameworksBySite(@RequestParam Long siteId){
        return frameworkService.getFrameworksBySite(siteId);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PostMapping("/addNewFramework")
    public void addNewFramework(@RequestBody FrameworkRequestModel frameworkRequestModel){
        frameworkService.addNewFramework(frameworkRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PutMapping("/updateFramework")
    public void updateFramework(@RequestParam Long id, @RequestBody FrameworkRequestModel frameworkRequestModel) throws Exception{
        frameworkService.updateFramework(id, frameworkRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @DeleteMapping("/deleteFramework")
    public void deleteFramework(@RequestParam Long id) throws Exception {
        frameworkService.deleteFramework(id);
    }
}
