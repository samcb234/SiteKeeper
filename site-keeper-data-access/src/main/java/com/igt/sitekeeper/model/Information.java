package com.igt.sitekeeper.model;

import lombok.Data;
import org.opensaml.xmlsec.signature.G;

import javax.persistence.*;

@Entity
@Table(name = "information")
@Data
public class Information {

    public Information(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "info")
    private String info;

    @Column(name = "discipline_id")
    private Long disciplineId;

    @Column(name = "project_id")
    private Long projectId;

    @Column(name="info_name", columnDefinition = "varchar(255) default 'information'")
    private String infoName;
}
