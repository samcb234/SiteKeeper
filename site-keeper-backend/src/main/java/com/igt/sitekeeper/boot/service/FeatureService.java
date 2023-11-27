package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.boot.utils.FeatureCleaner;
import com.igt.sitekeeper.model.Feature;
import com.igt.sitekeeper.model.combinationmodels.FeatureCount;
import com.igt.sitekeeper.model.relationmodels.DisciplineOnFeatures;
import com.igt.sitekeeper.repositories.FeatureRepository;
import com.igt.sitekeeper.repositories.SiteRepository;
import com.igt.sitekeeper.repositories.relationrepositories.DisciplineOnFeaturesRepository;
import com.igt.sitekeeper.requestmodel.FeatureRequestModel;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.DisciplineOnFeatureRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
@Transactional
public class FeatureService {

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private DisciplineOnFeaturesRepository disciplineOnFeaturesRepository;

    @Autowired
    private SiteRepository siteRepository;

    public FeatureService(){}

    public List<Feature> getAllFeatures(){
        return FeatureCleaner.cleanListOfFeatures(this.featureRepository.findAll());
    }

    public List<Feature> getFeaturesByStartOfNames(String name){
        List<Feature> f = featureRepository.findFeaturesByNameStartingWith(name);
        List<Feature> features = new ArrayList<>();
        for(int i = 0; i < Math.min(5, f.size()); i ++){
            features.add(f.get(i));
        }
        return FeatureCleaner.cleanListOfFeatures(features);
    }

    public Feature getFeatureById(Long featureId) throws Exception{
        Optional<Feature> feature = featureRepository.findById(featureId);

        if(!feature.isPresent()){
            throw new IllegalStateException("no feature corresponds to this id");
        }

        return FeatureCleaner.cleanSingleFeature(feature.get());
    }

    public List<Feature> getUnverifiedFeatures(){
        return FeatureCleaner.cleanListOfFeatures(featureRepository.findUnverifiedFeatures());
    }

    public void addDisciplineOnFeature(DisciplineOnFeatureRequestModel disciplineOnFeatureRequestModel){
        DisciplineOnFeatures d = new DisciplineOnFeatures();

        d.setDiscipline(disciplineOnFeatureRequestModel.getDiscipline());
        d.setFeature(disciplineOnFeatureRequestModel.getFeature());

        disciplineOnFeaturesRepository.save(d);
    }

    public void addNewFeature(FeatureRequestModel featureRequestModel) throws Exception{
        Feature f = new Feature();
        saveFeature(f, featureRequestModel);
    }

    public void updateFeature(Long id, FeatureRequestModel featureRequestModel) throws Exception{
        Optional<Feature> feature = featureRepository.findById(id);
        if(!feature.isPresent()){
            throw new IllegalStateException("No feature corresponds to this id");
        }
        saveFeature(feature.get(), featureRequestModel);
    }

    private void saveFeature(Feature f, FeatureRequestModel featureRequestModel) throws Exception{

        if(featureRequestModel.getParentFeature() != null){
            Optional<Feature> parentFeature = featureRepository.findById(featureRequestModel.getParentFeature().getId());
            if(!parentFeature.isPresent()){
                throw new IllegalStateException("parent feature doesn't exist");
            }
            parentAndSubfeatureCheck(parentFeature.get(), f);
            f.setParentFeature(parentFeature.get());
        } else if(featureRequestModel.getParentFeature() == null){
            f.setParentFeature(null);
        }
        f.setDescription(featureRequestModel.getDescription());
        f.setImg(featureRequestModel.getImg());
        f.setName(featureRequestModel.getName());
        f.setVerifiedByEngineer(featureRequestModel.isVerifiedByEngineer());
        f.setDisciplines(featureRequestModel.getDisciplines());

        featureRepository.save(f);
    }

    public void deleteFeature(Long id) throws Exception {
        Optional<Feature> feature = featureRepository.findById(id);

        if(!feature.isPresent()){
            throw new IllegalStateException("No feature corresponds to this id");
        }
        featureRepository.deleteById(id);
    }

    public List<Feature> getFeaturesByStartOfName(String name, Long siteId){
        return FeatureCleaner.cleanListOfFeatures(featureRepository.findFeaturesByStartOfName(name, siteId));
    }

    public List<Feature> getFeaturesByDisciplineType(String type){
        return FeatureCleaner.cleanListOfFeatures(featureRepository.findFeaturesByDisciplineType(type));
    }

    private void parentAndSubfeatureCheck(Feature potentialParent, Feature feature) throws Exception{
        Feature curFeature = potentialParent;
        while(curFeature != null){ //checking that assigning the potential parent won't create a loop
            if(curFeature.getId() == feature.getId()){
                throw new IllegalStateException("you cannot assign a feature as its own parent");
            }
            curFeature = curFeature.getParentFeature();
        }
        return;
    }

    public List<FeatureCount> getFeatureStatistics(){
       List<FeatureCount> out = new ArrayList<>();
       List<Feature> features = featureRepository.findAll();

       for(Feature feature: features){
           FeatureCount f = new FeatureCount();
           f.setName(feature.getName());
           f.setValue(featureRepository.getSingleFeatureCount(f.getName()));
           out.add(f);
       }
       return out;
    }


}
