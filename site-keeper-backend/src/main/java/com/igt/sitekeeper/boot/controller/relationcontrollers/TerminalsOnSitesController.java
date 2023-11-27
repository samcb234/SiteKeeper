package com.igt.sitekeeper.boot.controller.relationcontrollers;

import com.igt.sitekeeper.boot.service.relationservices.TerminalsOnSitesService;
import com.igt.sitekeeper.model.relationmodels.TerminalsOnSites;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.TerminalsOnSitesRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/terminalsOnSites")
public class TerminalsOnSitesController {

    private TerminalsOnSitesService terminalsOnSitesService;

    @Autowired
    public TerminalsOnSitesController(TerminalsOnSitesService terminalsOnSitesService){
        this.terminalsOnSitesService = terminalsOnSitesService;
    }

    @GetMapping("/getAllTerminalsOnSites")
    public List<TerminalsOnSites> getAllTerminalsOnSites(){
        return terminalsOnSitesService.getAllTerminalsOnSites();
    }

    @GetMapping("/getTerminalsOnSitesBySite")
    public List<TerminalsOnSites> getAllTerminalsOnSitesBySite(@RequestParam Long site){
        return terminalsOnSitesService.getTerminalsOnSitesBySite(site);
    }

    @PostMapping("/addTerminalsOnSites")
    public void addTerminalsOnSites(@RequestBody TerminalsOnSitesRequestModel terminalsOnSitesRequestModel) throws Exception{
        terminalsOnSitesService.addTerminalSOnSites(terminalsOnSitesRequestModel);
    }
}
