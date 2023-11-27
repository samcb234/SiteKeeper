package com.igt.sitekeeper.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "costing")
@Data
public class Costing {
    public Costing(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "cost", columnDefinition = "int default 0")
    private Long cost;

    @OneToMany(mappedBy = "costing")
    private List<Message> messages;
}
