package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.BaseFeatureService;
import com.igt.sitekeeper.boot.service.FeatureService;
import com.igt.sitekeeper.boot.utils.RoleUtils;
import com.igt.sitekeeper.model.BaseFeature;
import com.igt.sitekeeper.model.Feature;
import com.igt.sitekeeper.model.combinationmodels.FeatureCount;
import com.igt.sitekeeper.requestmodel.BaseFeatureRequestModel;
import com.igt.sitekeeper.requestmodel.FeatureRequestModel;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.DisciplineOnFeatureRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "api/feature")
public class FeatureController {

    @Autowired
    private FeatureService featureService;

    @Autowired
    private BaseFeatureService baseFeatureService;

    public FeatureController(){
    }

    @GetMapping("/getAllFeatures")
    public List<Feature> getAllFeatures(){
        return featureService.getAllFeatures();
    }

    @GetMapping("/getFeaturesByNameStart")
    public List<Feature> getFeaturesByStartOfName(@RequestParam String name){
        return featureService.getFeaturesByStartOfNames(name);
    }

    @GetMapping("/baseFeature/getAllFeatures")
    public List<BaseFeature> getAllBaseFeatures(){
        return baseFeatureService.getAllBaseFeatures();
    }

    @GetMapping("/baseFeature/getFeatureById")
    public BaseFeature getBaseFeatureById(@RequestParam Long id) throws Exception{
        return baseFeatureService.getBaseFeatureById(id);
    }

    @GetMapping("/getFeatureById")
    public Feature getFeatureById(@RequestParam Long featureId) throws Exception{
        return featureService.getFeatureById(featureId);
    }

    @GetMapping("/getUnverifiedFeatures")
    public List<Feature> getUnverifiedFeatures(){
        return featureService.getUnverifiedFeatures();
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PostMapping("/addNewFeature")
    public void addNewFeature(@RequestBody FeatureRequestModel featureRequestModel) throws Exception{
        featureService.addNewFeature(featureRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PostMapping("/addFeatureToDiscipline")
    public void addFeatureToDisciple(@RequestBody DisciplineOnFeatureRequestModel disciplineOnFeatureRequestModel){
        featureService.addDisciplineOnFeature(disciplineOnFeatureRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PostMapping("/baseFeature/addFeature")
    public void addBaseFeature(@RequestBody BaseFeatureRequestModel baseFeatureRequestModel){
        baseFeatureService.addBaseFeature(baseFeatureRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PutMapping("/updateFeature")
    public void updateFeature(@RequestParam Long id, @RequestBody FeatureRequestModel featureRequestModel) throws Exception {
        featureService.updateFeature(id, featureRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN})
    @DeleteMapping("/deleteFeature")
    public void deleteFeature(@RequestParam Long id) throws Exception {
        featureService.deleteFeature(id);
    }

    @GetMapping("/getFeaturesByStartOfName")
    public List<Feature> getFeaturesByStartOfName(@RequestParam String name, @RequestParam Long siteId){
        return featureService.getFeaturesByStartOfName(name, siteId);
    }

    @GetMapping("/getFeaturesByDisciplineType")
    public List <Feature> getFeaturesByDisciplineType(@RequestParam String type){
        return featureService.getFeaturesByDisciplineType(type);
    }

    @GetMapping("/getFeatureCount")
    public List<FeatureCount> getFeatureCount(){
        return featureService.getFeatureStatistics();
    }

}
