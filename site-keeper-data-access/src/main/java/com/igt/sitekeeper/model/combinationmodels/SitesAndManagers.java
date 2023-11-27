package com.igt.sitekeeper.model.combinationmodels;

import com.igt.sitekeeper.model.Site;
import com.igt.sitekeeper.model.User;
import lombok.Data;

@Data
public class SitesAndManagers {
    private Site site;
    private User user;
}
