package com.igt.sitekeeper.boot.controller.relationcontrollers;

import com.igt.sitekeeper.boot.service.relationservices.UsersOnSitesService;
import com.igt.sitekeeper.model.relationmodels.UsersOnSites;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.UsersOnSitesRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/usersOnSites")
public class UsersOnSitesController {

    @Autowired
    private UsersOnSitesService usersOnSitesService;

    public UsersOnSitesController(){}

    @GetMapping("/getAllUsersOnSites")
    public List<UsersOnSites> getAllUsersOnSites(){
        return usersOnSitesService.getAllUsersOnSites();
    }

    @GetMapping("/getUsersOnSitesBySite")
    public List<UsersOnSites> getUsersOnSitesBySite(@RequestParam Long site){
        return usersOnSitesService.getUsersOnSitesBySite(site);
    }

    @PostMapping("/addNewUsersOnSites")
    public void addNewUsersOnSites(@RequestBody UsersOnSitesRequestModel usersOnSitesRequestModel) throws Exception{
        usersOnSitesService.addNewUsersOnSites(usersOnSitesRequestModel);
    }

    @PutMapping("/updateUsersOnSites")
    public void updateUsersOnSites(@RequestBody UsersOnSitesRequestModel usersOnSitesRequestModel) throws Exception {
        usersOnSitesService.updateUsersOnSites(usersOnSitesRequestModel);
    }
}
