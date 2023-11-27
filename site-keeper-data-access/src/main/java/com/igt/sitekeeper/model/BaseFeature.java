package com.igt.sitekeeper.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="base_feature")
@Data
public class BaseFeature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "img")
    private String img;

    @Column(name = "description")
    private String description;

    @Column(name = "cost")
    private double cost;

    @Column(name="name")
    private String name;

    public BaseFeature(){}

    public BaseFeature(String img, String description, double cost){
        this.img = img;
        this.description = description;
        this.cost =cost;
    }
}
