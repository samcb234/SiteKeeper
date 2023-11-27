package com.igt.sitekeeper.boot.controller.relationcontrollers;

import com.igt.sitekeeper.boot.service.relationservices.FeaturesOnSitesService;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnSites;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.FeaturesOnSitesRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/featuresOnSites")
public class FeaturesOnSitesController {

    private FeaturesOnSitesService featuresOnSitesService;

    @Autowired
    public FeaturesOnSitesController(FeaturesOnSitesService featuresOnSitesService){
        this.featuresOnSitesService = featuresOnSitesService;
    }

    @GetMapping("/getAllFeaturesOnSites")
    public List<FeaturesOnSites> getAllFeaturesOnSites(){
        return featuresOnSitesService.getAllFeaturesOnSites();
    }

    @GetMapping("/getFeaturesOnSitesBySite")
    public List<FeaturesOnSites> getAllFeaturesOnSitesBySite(@RequestParam Long site){
        return featuresOnSitesService.getFeaturesOnSitesBySite(site);
    }

    @PostMapping("/addFeaturesOnSites")
    public void addFeaturesOnSites(@RequestBody FeaturesOnSitesRequestModel featuresOnSitesRequestModel) throws Exception{
        featuresOnSitesService.addFeaturesOnSites(featuresOnSitesRequestModel);
    }
}
