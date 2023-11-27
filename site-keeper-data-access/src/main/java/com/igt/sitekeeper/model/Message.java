package com.igt.sitekeeper.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "message")
@Data
public class Message {

    public Message(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="sender", nullable=true)
    private User sender;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="costing", nullable=true)
    private Costing costing;

    @Column(name = "date_sent")
    private String dateSent;

    @Column(name= "message")
    private String message;
}
