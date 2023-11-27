package com.igt.sitekeeper.repositories.relationrepositories;

import com.igt.sitekeeper.model.relationmodels.UsersOnSites;
import com.igt.sitekeeper.model.relationmodels.relationshipids.UsersOnSitesId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsersOnSitesRepository extends JpaRepository<UsersOnSites, UsersOnSitesId> {

    List<UsersOnSites> findUsersOnSitesBySite(Long site);
}
