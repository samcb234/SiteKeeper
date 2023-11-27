package com.igt.sitekeeper.repositories;

import com.igt.sitekeeper.model.Project;
import com.igt.sitekeeper.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByContactInfo(String contactInfo);

    @Query("select o from User o where id in :user_ids")
    List<User> findUserByIdIs(@Param("user_ids") List<Long> ids);

    @Query(value = "select * from user u " +
            "left join users_on_sites us on u.id = us.user " +
            "where u.contact_info like :email% " +
            "and not exists(select * from users_on_sites where u.id = users_on_sites.user and users_on_sites.site = :siteId)",
    nativeQuery = true)
    public List<User> findUsersByContactInfoAndSite(@Param("email") String email, @Param("siteId") Long siteId);

    @Query(value = "select * from user " +
            "left join users_on_sites " +
            "on user.id = users_on_sites.user " +
            "where :siteId = users_on_sites.site", nativeQuery = true)
    List<User> findUsersBySite(@Param("siteId") Long siteId);

    @Query(value = "select us.active from users_on_sites us " +
            "where us.user = :userId and us.site = :siteId", nativeQuery = true)
    boolean isUserActiveOnSite(@Param("userId") Long userId, @Param("siteId") Long siteId);

}
