package com.igt.sitekeeper.boot.service.relationservices;

import com.igt.sitekeeper.model.relationmodels.UsersOnSites;
import com.igt.sitekeeper.model.relationmodels.relationshipids.UsersOnSitesId;
import com.igt.sitekeeper.repositories.relationrepositories.UsersOnSitesRepository;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.UsersOnSitesRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsersOnSitesService {

    @Autowired
    private UsersOnSitesRepository usersOnSitesRepository;

    public UsersOnSitesService(){}

    public List<UsersOnSites> getAllUsersOnSites(){
        return usersOnSitesRepository.findAll();
    }

    public List<UsersOnSites> getUsersOnSitesBySite(Long site){
        return usersOnSitesRepository.findUsersOnSitesBySite(site);
    }

    public void addNewUsersOnSites(UsersOnSitesRequestModel usersOnSitesRequestModel) throws Exception{
        UsersOnSitesId usersOnSitesId = new UsersOnSitesId();
        usersOnSitesId.setSite(usersOnSitesRequestModel.getSite());
        usersOnSitesId.setUser(usersOnSitesRequestModel.getUser());

        Optional<UsersOnSites> u = usersOnSitesRepository.findById(usersOnSitesId);

        if(u.isPresent()){
            throw new IllegalStateException("this relation already exists!");
        }

        UsersOnSites usersOnSites = new UsersOnSites();

        usersOnSites.setActive(usersOnSitesRequestModel.isActive());
        usersOnSites.setSite(usersOnSitesRequestModel.getSite());
        usersOnSites.setUser(usersOnSitesRequestModel.getUser());

        usersOnSitesRepository.save(usersOnSites);
    }

    public void updateUsersOnSites(UsersOnSitesRequestModel usersOnSitesRequestModel){
        UsersOnSitesId usersOnSitesId = new UsersOnSitesId();
        usersOnSitesId.setUser(usersOnSitesRequestModel.getUser());
        usersOnSitesId.setSite(usersOnSitesRequestModel.getSite());

        Optional<UsersOnSites> usersOnSites = usersOnSitesRepository.findById(usersOnSitesId);

        if(!usersOnSites.isPresent()){
            throw new IllegalStateException("there is no relation between this site and user");
        }

        usersOnSites.get().setUser(usersOnSitesRequestModel.getUser());
        usersOnSites.get().setSite(usersOnSitesRequestModel.getSite());
        usersOnSites.get().setActive(usersOnSitesRequestModel.isActive());

        usersOnSitesRepository.save(usersOnSites.get());
    }
}
