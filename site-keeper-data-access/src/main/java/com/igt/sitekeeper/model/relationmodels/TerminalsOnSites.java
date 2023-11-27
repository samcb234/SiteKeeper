package com.igt.sitekeeper.model.relationmodels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igt.sitekeeper.model.Framework;
import com.igt.sitekeeper.model.Peripheral;
import com.igt.sitekeeper.model.Site;
import com.igt.sitekeeper.model.Terminal;
import com.igt.sitekeeper.model.relationmodels.relationshipids.TerminalsOnSitesId;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "terminals_on_sites")
@Data
public class TerminalsOnSites{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "terminal")
    private Terminal terminal;

    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "site")
    private Site site;

    @ManyToOne
    @JoinColumn(name = "framework")
    private Framework framework;

    @Column(name = "bom", columnDefinition = "mediumblob default null")
    private String bom;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(name = "peripherals_on_terminals_on_sites",
    joinColumns = @JoinColumn(name = "terminals_on_sites"),
    inverseJoinColumns = @JoinColumn(name = "peripheral"))
    private List<Peripheral> peripherals;
}
