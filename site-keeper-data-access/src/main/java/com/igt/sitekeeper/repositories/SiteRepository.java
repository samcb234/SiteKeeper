package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Costing;
import com.igt.sitekeeper.model.Site;
import com.igt.sitekeeper.model.combinationmodels.SitesAndNames;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Optional;

public interface SiteRepository extends JpaRepository<Site, Long> {

    Optional<Site> findByAbbreviation(String abbreviation);
}