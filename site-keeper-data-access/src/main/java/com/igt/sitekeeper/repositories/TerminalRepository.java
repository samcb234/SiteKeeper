package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Terminal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

//THIS REPOSITORY ALSO CONTAINS METHODS FOR GETTING OTHER INVENTORY ENTITIES FROM THE DB
public interface TerminalRepository extends JpaRepository<Terminal, Long> {

    @Query("select o from Terminal o where id in :terminal_ids")
    List<Terminal> findTerminalsByIdIs(@Param("terminal_ids") List<Long> ids);

    @Query(value = "select * from terminal t " +
            "where t.name like :name% " +
            "limit 5", nativeQuery = true)
    List<Terminal> findTerminalByStartOfName(@Param("name") String name);

    @Query(value = "select * from terminal t " +
            "left join terminals_on_sites ts " +
            "on t.id = ts.terminal " +
            "where ts.site  = :siteId", nativeQuery = true)
    List<Terminal> findTerminalsBySite(@Param("siteId") Long siteId);

    //returns middleware based on site
    @Query(value = "select * from middleware m " +
            "left join middleware_on_sites ms " +
            "on ms.middleware = m.id " +
            "where ms.site = :siteId", nativeQuery = true)
    List<Terminal> findMiddlewareBySite(@Param("siteId") Long siteId);

    @Query(value = "select * from middleware m " +
            "left join middleware_on_projects mp " +
            "on mp.middleware = m.id " +
            "where mp.project = :projectId", nativeQuery = true)
    List<Terminal> findMiddlewareByProject(@Param("projectId") Long projectId);

    @Query(value = "select * from host h " +
            "left join hosts_on_sites hs " +
            "on hs.host = h.id " +
            "where hs.site = :siteId", nativeQuery = true)
    List<Terminal> findHostBySite(@Param("siteId") Long siteId);

    @Query(value = "select * from host h " +
            "left join hosts_on_projects hp " +
            "on hp.host = h.id " +
            "where hp.project = :projectId", nativeQuery = true)
    List<Terminal> findHostByProject(@Param("projectId") Long projectId);

    Optional<Terminal> findTerminalByName(String name);

    Terminal getTerminalByName(String name);

}
