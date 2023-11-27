package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Costing;
import com.igt.sitekeeper.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findMessagesByCosting(Costing costing);

    @Query(value = "select * from message " +
            "left join costing c on c.id = message.costing " +
            "left join site s on s.costing = c.id " +
            "where s.id = :siteId", nativeQuery = true)
    List<Message> findMessagesBySiteId(@Param("siteId") Long siteId);




}
