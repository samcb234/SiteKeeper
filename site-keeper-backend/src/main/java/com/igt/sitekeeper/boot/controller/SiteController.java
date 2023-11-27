package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.SiteService;
import com.igt.sitekeeper.boot.utils.RoleUtils;
import com.igt.sitekeeper.model.Site;
import com.igt.sitekeeper.requestmodel.SiteRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin(originPatterns = "${cors.allowed.url}", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping(value="/api/site")
public class SiteController {

    @Autowired
    private SiteService siteService;

    public SiteController(){}

    @GetMapping("/getAllSites")
    public List<Site> getAllSites(){
        // use lombok...
        // Site.builder().siteManager(1L).id(1L).name("asdd").logo("asdasdadasdasd").location("dgfg").build();
        return siteService.getAllSites();
    }

    @GetMapping("/getSiteById")
    public Site getSiteById(@RequestParam Long id)throws Exception{
        return siteService.getSiteById(id);
    }

    @RolesAllowed({RoleUtils.ADMIN})
    @PostMapping("/addNewSite")
    public void addNewSite(@RequestBody SiteRequestModel siteRequestModel){
        this.siteService.addNewSite(siteRequestModel);
    }
    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PutMapping("/updateSite")
    public void updateSite(@RequestParam Long id, @RequestBody SiteRequestModel siteRequestModel) throws Exception{
        siteService.updateSite(id, siteRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN})
    @DeleteMapping("/deleteSite")
    public void deleteSite(@RequestParam Long id) throws Exception{
        siteService.deleteSite(id);
    }


    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER})
    @PutMapping("/removeLeadEngineer")
    public void removeLeadEngineer(@RequestParam Long siteId, @RequestParam String discipline, @RequestParam Long userId) throws Exception{
        siteService.removeLeadEngineer(siteId, discipline, userId);
    }
    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER})
    @PutMapping("/addLeadEngineer")
    public void addLeadEngineer(@RequestParam Long siteId, @RequestParam String discipline, @RequestParam String email) throws Exception{
        siteService.addLeadEngineer(siteId, discipline, email);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER})
    @PutMapping("/addUserToSite")
    public void addUserToSite(@RequestParam Long siteId, @RequestParam Long userId) throws Exception{
        siteService.addUserToSite(siteId, userId);
    }

}
