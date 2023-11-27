package com.igt.sitekeeper.model.relationmodels;

import com.igt.sitekeeper.model.relationmodels.relationshipids.UsersOnSitesId;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "users_on_sites")
@Data
@IdClass(UsersOnSitesId.class)
public class UsersOnSites {

    @Id
    @Column(name = "user")
    private Long user;

    @Id
    @Column(name = "site")
    private Long site;

    @Column(name = "active")
    private boolean active;

    public UsersOnSites(){}

    public UsersOnSites(Long user, Long site, boolean active){
        this.user = user;
        this.site = site;
        this.active = active;
    }
}
