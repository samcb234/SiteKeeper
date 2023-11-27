package com.igt.sitekeeper.boot.service.relationservices;

import com.igt.sitekeeper.model.Feature;
import com.igt.sitekeeper.model.Site;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnSites;
import com.igt.sitekeeper.model.relationmodels.relationshipids.FeaturesOnSitesId;
import com.igt.sitekeeper.repositories.FeatureRepository;
import com.igt.sitekeeper.repositories.SiteRepository;
import com.igt.sitekeeper.repositories.relationrepositories.FeaturesOnSitesRepository;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.FeaturesOnSitesRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FeaturesOnSitesService {

    @Autowired
    private FeaturesOnSitesRepository featuresOnSitesRepository;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private FeatureRepository featureRepository;

    public FeaturesOnSitesService(){
    }

    public List<FeaturesOnSites> getAllFeaturesOnSites(){
        return featuresOnSitesRepository.findAll();
    }

    public List<FeaturesOnSites> getFeaturesOnSitesBySite(Long site){
        return featuresOnSitesRepository.findFeaturesOnSitesBySite(site);
    }

    public void addFeaturesOnSites(FeaturesOnSitesRequestModel FeaturesOnSitesRequestModel) throws Exception{
        FeaturesOnSites featuresOnSites = new FeaturesOnSites();

        Optional<Site> site = siteRepository.findById(FeaturesOnSitesRequestModel.getSite());
        Optional<Feature> feature = featureRepository.findById(FeaturesOnSitesRequestModel.getFeature());
        if(!site.isPresent() || !feature.isPresent()){
            throw new Exception("something is wrong here");
        }

        featuresOnSites.setFeature(feature.get());
        featuresOnSites.setSite(site.get());
        featuresOnSites.setName(feature.get().getName());

        featuresOnSitesRepository.save(featuresOnSites);
    }
}
