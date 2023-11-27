package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Costing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Optional;

public interface CostingRepository extends JpaRepository<Costing, Long> {

    @Query(value = "select * from costing " +
            "left join site on site.costing = costing.id " +
            "where site.id = :siteId", nativeQuery = true)
    Optional<Costing> findCostingBySite(@Param("siteId") Long siteId);
}
