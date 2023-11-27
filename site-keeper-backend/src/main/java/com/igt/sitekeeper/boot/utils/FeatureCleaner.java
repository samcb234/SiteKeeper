package com.igt.sitekeeper.boot.utils;

import com.igt.sitekeeper.model.Feature;
import com.igt.sitekeeper.model.Project;
import com.igt.sitekeeper.model.Site;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnProjects;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnSites;

import java.util.ArrayList;
import java.util.List;

//Utils class for reducing the repetition of features
public class FeatureCleaner {
    public static Feature cleanSingleFeature(Feature feature){
        if(feature.getParentFeature() == null){
            return feature;
        }

        Feature parent = new Feature(feature.getParentFeature());
        parent.setParentFeature(null);
        feature.setParentFeature(parent);
        return feature;
    }

    public static List<Feature> cleanListOfFeatures(List<Feature> features){
        for(Feature feature: features){
            cleanSingleFeature(feature);
        }
        return features;
    }

    public static void cleanFeaturesOnProjects(List<FeaturesOnProjects> featuresOnProjects){
        for(FeaturesOnProjects feature: featuresOnProjects){
            cleanSingleFeature(feature.getFeature());
        }
    }

    public static void cleanFeaturesOnSites(List<FeaturesOnSites> featuresOnSites){
        for(FeaturesOnSites feature: featuresOnSites){
            cleanSingleFeature(feature.getFeature());
        }
    }

    public static List<Project> cleanProjects(List<Project> projects){
        for(Project project: projects){
            cleanFeaturesOnProjects(project.getFeatures());
        }
        return projects;
    }
}
