package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.boot.utils.ExcelUtils;
import com.igt.sitekeeper.boot.utils.FeatureCleaner;
import com.igt.sitekeeper.boot.utils.StatusUtils;
import com.igt.sitekeeper.model.*;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnSites;
import com.igt.sitekeeper.model.relationmodels.TerminalsOnSites;
import com.igt.sitekeeper.repositories.*;
import com.igt.sitekeeper.repositories.relationrepositories.DisciplinesOnSitesRepository;
import com.igt.sitekeeper.requestmodel.SiteRequestModel;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.TerminalsOnSitesRequestModel;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;




@Service
@Transactional
public class SiteService {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private DisciplineRepository disciplineRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectStatusRepository projectStatusRepository;

    public SiteService(){
    }
    public List<Site> getAllSites(){
        List<Site> sites = siteRepository.findAll();
        for(Site site: sites){
            FeatureCleaner.cleanFeaturesOnSites(site.getFeatures());
        }
        return StatusUtils.siteListChecker(sites, siteRepository, projectRepository, projectStatusRepository);
    }

    public Site getSiteById(Long id) throws Exception{
        Optional<Site> site = siteRepository.findById(id);

        if(!site.isPresent()){
            throw new IllegalStateException("no site corresponds to this id");
        }
        FeatureCleaner.cleanFeaturesOnSites(site.get().getFeatures());
        return StatusUtils.siteChecker(site.get(), siteRepository, projectRepository, projectStatusRepository);
    }

    public void addNewSite(SiteRequestModel siteRequestModel){

        Site newSite = new Site();
        newSite.setName(siteRequestModel.getName());
        newSite.setLogo(siteRequestModel.getLogo());
        newSite.setLocation(siteRequestModel.getLocation());
        newSite.setSiteManager(siteRequestModel.getSiteManager());

        this.siteRepository.save(newSite);
    }

    public void updateSite(Long id, SiteRequestModel siteRequestModel) throws Exception {
        System.out.println(siteRequestModel.getTerminalsOnSites().get(0).getBom());
        Optional<Site> oSite = siteRepository.findById(id);

        if(!oSite.isPresent()){
            throw new IllegalStateException("there isn't a site corresponding to this id");
        }

        Site site = oSite.get();

        site.setSiteManager(siteRequestModel.getSiteManager());
        site.setLocation(siteRequestModel.getLocation());
        site.setLogo(siteRequestModel.getLogo());
        site.setName(siteRequestModel.getName());
        site.setAbbreviation(siteRequestModel.getAbbreviation());
        site.setBetslipId(siteRequestModel.getBetslipId());
//        site.setDisciplines(siteRequestModel.getDisciplines());

        List<TerminalsOnSites> terminalsOnSites = new ArrayList<>();

        for(TerminalsOnSitesRequestModel t: siteRequestModel.getTerminalsOnSites()){

            TerminalsOnSites ts = new TerminalsOnSites();

            ts.setFramework(t.getFramework());
            ts.setTerminal(t.getTerminal());
            ts.setBom(t.getBom());
            ts.setSite(site);

            terminalsOnSites.add(ts);
        }

        site.setTerminalsOnSites(terminalsOnSites);

        siteRepository.save(site);
    }

    public void deleteSite(Long id) throws Exception {
        Optional<Site> site = siteRepository.findById(id);

        if(!site.isPresent()){
            throw new IllegalStateException("no site corresponds to this id");
        }

        siteRepository.deleteById(id);
    }

    public void removeLeadEngineer(Long siteId, String discipline, Long userId) throws Exception{
        Optional<Site> site = siteRepository.findById(siteId);
        Optional<Discipline> disciplineOptional = disciplineRepository.findDisciplineByType(discipline);
        Optional<User> user = userRepository.findById(userId);
        if(!site.isPresent() || !disciplineOptional.isPresent() || !user.isPresent()){
            throw new IllegalStateException("something isn't in the db");
        }
        for(DisciplinesOnSites ds: site.get().getDisciplines()){
            if(ds.getDiscipline().getType().equals(discipline)){
                ds.getLeadEngineers().remove(user.get());
            }
        }
        siteRepository.save(site.get());
    }

    public void addLeadEngineer(Long siteId, String discipline, String email) throws Exception{
        Optional<Site> site = siteRepository.findById(siteId);
        Optional<Discipline> disciplineOptional = disciplineRepository.findDisciplineByType(discipline);
        Optional<User> user = userRepository.findUserByContactInfo(email);
        if(!site.isPresent() || !disciplineOptional.isPresent() || !user.isPresent()){
            throw new IllegalStateException("something isn't in the db");
        }

        for(DisciplinesOnSites ds: site.get().getDisciplines()){
            if(ds.getDiscipline().getType().equals(discipline) && !ds.getLeadEngineers().contains(user.get())){
                ds.getLeadEngineers().add(user.get());
            }
        }

        siteRepository.save(site.get());
    }

    public void addUserToSite(Long siteId, Long userId) throws Exception{
        Optional<Site> site = siteRepository.findById(siteId);
        Optional<User> user = userRepository.findById(userId);
        if(!site.isPresent()){
            throw new IllegalStateException("no site exists with this id");
        }
        if(!user.isPresent()){
            throw new IllegalStateException("no user exists with this id");
        }

        site.get().getUsers().add(user.get());
        siteRepository.save(site.get());

    }
}
