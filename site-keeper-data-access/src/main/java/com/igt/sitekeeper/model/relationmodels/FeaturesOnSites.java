package com.igt.sitekeeper.model.relationmodels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igt.sitekeeper.model.Feature;
import com.igt.sitekeeper.model.Site;
import com.igt.sitekeeper.model.relationmodels.relationshipids.FeaturesOnSitesId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "features_on_sites")
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(FeaturesOnSitesId.class)
public class FeaturesOnSites implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "feature")
    private Feature feature;

    @JsonIgnore
    @Id
    @ManyToOne
    @JoinColumn(name = "site")
    private Site site;

    @Column(name = "name",columnDefinition = "varchar(255) not null default ''")
    private String name;
}
