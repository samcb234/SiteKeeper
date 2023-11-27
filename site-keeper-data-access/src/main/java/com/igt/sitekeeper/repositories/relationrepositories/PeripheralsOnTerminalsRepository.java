package com.igt.sitekeeper.repositories.relationrepositories;

import com.igt.sitekeeper.model.relationmodels.PeripheralsOnTerminals;
import com.igt.sitekeeper.model.relationmodels.ProjectsOnSites;
import com.igt.sitekeeper.model.relationmodels.relationshipids.PeripheralsOnTerminalsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeripheralsOnTerminalsRepository extends JpaRepository<PeripheralsOnTerminals, PeripheralsOnTerminalsId> {
}
