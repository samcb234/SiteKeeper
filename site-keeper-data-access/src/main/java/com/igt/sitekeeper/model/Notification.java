package com.igt.sitekeeper.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "notification")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "message")
    private Long message;

    @ManyToOne
    @JoinColumn(name="user", nullable=true)
    private User user;

    @Column(name = "seen_by_user")
    private boolean seenByUser;

    @Column(name = "link")
    private String link;

}
