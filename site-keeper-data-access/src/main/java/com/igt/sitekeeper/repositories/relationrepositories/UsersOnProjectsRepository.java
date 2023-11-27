package com.igt.sitekeeper.repositories.relationrepositories;

import com.igt.sitekeeper.model.relationmodels.UsersOnProjects;
import com.igt.sitekeeper.model.relationmodels.relationshipids.UsersOnProjectsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersOnProjectsRepository extends JpaRepository<UsersOnProjects, UsersOnProjectsId> {
}
