package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Framework;
import com.igt.sitekeeper.model.Terminal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.awt.*;

public interface FrameworkRepository extends JpaRepository<Framework, Long> {




    @Query(value = "select * from framework f " +
            "left join terminals_on_sites ts " +
            "on ts.terminal = f.terminal_id " +
            "where ts.site = :siteId", nativeQuery = true)
    List<Framework> findFrameworksBySite(@Param("siteId") Long siteId);

    Optional<Framework> findFrameworkByName(String name);
}
