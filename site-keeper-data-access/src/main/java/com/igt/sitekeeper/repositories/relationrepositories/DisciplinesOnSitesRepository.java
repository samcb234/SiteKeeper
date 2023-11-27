package com.igt.sitekeeper.repositories.relationrepositories;

import com.igt.sitekeeper.model.relationmodels.DisciplinesOnSites;
import com.igt.sitekeeper.model.relationmodels.relationshipids.DisciplinesOnSitesId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DisciplinesOnSitesRepository extends JpaRepository<DisciplinesOnSites, DisciplinesOnSitesId> {

    List<DisciplinesOnSites> findDisciplinesOnSitesBySite(Long site);
}
