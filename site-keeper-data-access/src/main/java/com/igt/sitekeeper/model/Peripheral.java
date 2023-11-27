package com.igt.sitekeeper.model;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igt.sitekeeper.model.relationmodels.TerminalsOnSites;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="peripheral")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Peripheral {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "img")
    private String img;

    @Column(name = "description")
    private String description;

    @Column(name="name")
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "peripherals")
    private List<TerminalsOnSites> terminalsOnSites;

}
