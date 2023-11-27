package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Feature;
import com.igt.sitekeeper.model.Terminal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.HashMap;
import java.util.List;

public interface FeatureRepository extends JpaRepository<Feature, Long> {

    List<Feature> findFeaturesByNameStartingWith(String name);

    @Query(value = "select * from feature f left join features_on_sites fs on f.id = fs.feature " +
            "where f.name like :name% and not exists(" +
            "select * from features_on_sites where f.id = features_on_sites.feature and features_on_sites.site = :siteId)",
    nativeQuery = true)
    List<Feature> findFeaturesByStartOfName(@Param("name") String name, @Param("siteId") Long siteId);

    @Query(value = "select * from feature f  left join disciplines_on_features df on f.id = df.feature  left join discipline d on d.id = df.discipline where d.type = :name", nativeQuery = true)
    List <Feature> findFeaturesByDisciplineType(@Param("name") String name);


    @Query(value = "select * from feature " +
            "where feature.verified_by_engineer = false", nativeQuery = true)
    List<Feature> findUnverifiedFeatures();

    @Query(value="select f.name, count(*) from feature f " +
            "left join features_on_sites fs on fs.feature = f.id " +
            "group by f.name", nativeQuery = true)
    HashMap<String, Integer> getFeatureCount();


    @Query(value="select count(*) from feature f " +
            "left join features_on_sites fs on fs.feature = f.id " +
            "where f.name = :name " +
            "group by f.name", nativeQuery = true)
    long getSingleFeatureCount(@Param("name") String name);
}
