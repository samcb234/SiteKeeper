package com.igt.sitekeeper.model.relationmodels;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.igt.sitekeeper.model.Discipline;
import com.igt.sitekeeper.model.Site;
import com.igt.sitekeeper.model.User;
import com.igt.sitekeeper.model.relationmodels.relationshipids.DisciplinesOnSitesId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "disciplines_on_sites")
@IdClass(DisciplinesOnSitesId.class)
@NoArgsConstructor
@AllArgsConstructor
public class DisciplinesOnSites implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "discipline")
    private Discipline discipline;

    @JsonIgnore
    @Id
    @ManyToOne
    @JoinColumn(name = "site")
    private Site site;

    @Column(name = "total_cost")
    private Double totalCost;

    @ManyToOne
    @JoinColumn(name = "estimated_by", nullable = true)
    private User estimatedBy;

    @Column(name = "verified", columnDefinition = "boolean default false")
    private boolean verified;

    @ManyToOne
    @JoinColumn(name = "verified_by", nullable = true)
    private User verifiedBy;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(name = "site_discipline_lead_engineers",
    joinColumns = {@JoinColumn(name = "discipline"), @JoinColumn(name = "site")},
    inverseJoinColumns = {@JoinColumn(name = "user")})
    private List<User> leadEngineers;

    public List<User> getLeadEngineers(){return leadEngineers;}

    public void setLeadEngineers(List<User> leadEngineers){
        this.leadEngineers = leadEngineers;
    }

    public Discipline getDiscipline() {
        return discipline;
    }

    public void setDiscipline(Discipline discipline) {
        this.discipline = discipline;
    }

    @JsonIgnore
    public Site getSite() {
        return site;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public User getEstimatedBy() {
        return estimatedBy;
    }

    public void setEstimatedBy(User estimatedBy) {
        this.estimatedBy = estimatedBy;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public User getVerifiedBy() {
        return verifiedBy;
    }

    public void setVerifiedBy(User verifiedBy) {
        this.verifiedBy = verifiedBy;
    }
}
