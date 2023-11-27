package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Notification;
import com.igt.sitekeeper.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findNotificationByUser(Long user);

    List<Notification> findNotificationsByUserAndSeenByUser(User user, boolean seenByUser);
}
