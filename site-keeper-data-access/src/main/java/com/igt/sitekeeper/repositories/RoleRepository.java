package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleModel, Long> {
    Optional<RoleModel> findRoleModelByRole(String role);
}
