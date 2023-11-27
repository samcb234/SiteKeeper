package com.igt.sitekeeper.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="framework")
@Data
public class Framework {

    public Framework(){}

    public Framework(String description, Long terminalId, String name){
        this.description = description;
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name= "name")
    private String name;

}
