package com.igt.sitekeeper.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.awt.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "terminal")
@Data
public class Terminal extends BaseInventory{//THIS NOW REPRESENTS OTHER INVENTORY ITEMS(MIDDLEWARE/HOST, ECT)

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
//    private Long id;
//
//    @Column(name = "img")
//    private String img;
//
//    @Column(name = "description")
//    private String description;
//
//    @Column(name="name")
//    private String name;

}
