package com.igt.sitekeeper.repositories.relationrepositories;

import com.igt.sitekeeper.model.relationmodels.FeaturesOnSites;
import com.igt.sitekeeper.model.relationmodels.relationshipids.FeaturesOnSitesId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeaturesOnSitesRepository extends JpaRepository<FeaturesOnSites, FeaturesOnSitesId> {
    List<FeaturesOnSites> findFeaturesOnSitesBySite(Long site);
}
