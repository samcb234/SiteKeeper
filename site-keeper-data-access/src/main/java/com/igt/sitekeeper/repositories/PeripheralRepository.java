package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Framework;
import com.igt.sitekeeper.model.Peripheral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PeripheralRepository extends JpaRepository<Peripheral, Long> {

    @Query(value = "select * from peripheral f " +
            "where f.name like :name% " +
            "limit 5", nativeQuery = true)
    List<Peripheral> findPeripheralsByStartOfName(@Param("name") String name);

    Optional<Peripheral> findPeripheralByName(String name);
}
