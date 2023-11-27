package com.igt.sitekeeper.repositories.relationrepositories;

import com.igt.sitekeeper.model.relationmodels.TerminalsOnProjects;
import com.igt.sitekeeper.model.relationmodels.TerminalsOnSites;
import com.igt.sitekeeper.model.relationmodels.relationshipids.TerminalsOnSitesId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TerminalsOnSitesRepository extends JpaRepository<TerminalsOnSites, Long> {

    List<TerminalsOnSites> findTerminalsOnSitesBySite(Long site);
}
