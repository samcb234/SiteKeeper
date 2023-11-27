package com.igt.sitekeeper.boot.service.relationservices;

import com.igt.sitekeeper.model.Site;
import com.igt.sitekeeper.model.Terminal;
import com.igt.sitekeeper.model.relationmodels.TerminalsOnSites;
import com.igt.sitekeeper.model.relationmodels.relationshipids.TerminalsOnSitesId;
import com.igt.sitekeeper.repositories.SiteRepository;
import com.igt.sitekeeper.repositories.TerminalRepository;
import com.igt.sitekeeper.repositories.relationrepositories.TerminalsOnSitesRepository;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.TerminalsOnSitesRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TerminalsOnSitesService {

    @Autowired
    private TerminalsOnSitesRepository terminalsOnSitesRepository;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private TerminalRepository terminalRepository;

    public TerminalsOnSitesService(){
    }

    public List<TerminalsOnSites> getAllTerminalsOnSites(){
        return terminalsOnSitesRepository.findAll();
    }

    public List<TerminalsOnSites> getTerminalsOnSitesBySite(Long site){
        return terminalsOnSitesRepository.findTerminalsOnSitesBySite(site);
    }

    public void addTerminalSOnSites(TerminalsOnSitesRequestModel terminalsOnSitesRequestModel) throws Exception{
        TerminalsOnSites terminalsOnSites = new TerminalsOnSites();

        Optional<Terminal> terminal = terminalRepository.findById(terminalsOnSitesRequestModel.getTerminal().getId());
        Optional<Site> site = siteRepository.findById(terminalsOnSitesRequestModel.getSite());

        if(!terminal.isPresent() || !site.isPresent()){
            throw new IllegalStateException("either the terminal or the site doesn't exist");
        }

        terminalsOnSites.setTerminal(terminal.get());
        terminalsOnSites.setSite(site.get());
        terminalsOnSites.setBom(terminalsOnSitesRequestModel.getBom());

        terminalsOnSitesRepository.save(terminalsOnSites);
    }
}
