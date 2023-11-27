package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.boot.utils.FeatureCleaner;
import com.igt.sitekeeper.boot.utils.RestTemplateUtils;
import com.igt.sitekeeper.boot.utils.StatusUtils;
import com.igt.sitekeeper.components.KeystoreHandler;
import com.igt.sitekeeper.boot.utils.EmailUtils;
import com.igt.sitekeeper.boot.utils.HTMLUtils;
import com.igt.sitekeeper.model.*;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnSites;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnProjects;
import com.igt.sitekeeper.model.relationmodels.UsersOnProjects;
import com.igt.sitekeeper.model.relationmodels.relationshipids.DisciplinesOnProjectsId;
import com.igt.sitekeeper.model.relationmodels.relationshipids.FeaturesOnProjectsId;
import com.igt.sitekeeper.repositories.*;
import com.igt.sitekeeper.repositories.relationrepositories.DisciplinesOnProjectsRepository;
import com.igt.sitekeeper.repositories.relationrepositories.FeaturesOnProjectsRepository;
import com.igt.sitekeeper.requestmodel.ProjectRequestModel;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.DisciplinesOnProjectsRequestModel;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.FeaturesOnProjectsRequestModel;
import com.igt.sitekeeper.service.MailProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StreamUtils;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.util.*;

import static com.igt.sitekeeper.boot.utils.RestTemplateUtils.CAMELEON_DOC_GEN;
import static com.igt.sitekeeper.boot.utils.RestTemplateUtils.CAMELEON_LOGIN;

@Component
@Service
@Transactional
public class ProjectService {
    static Logger logger = LoggerFactory.getLogger(ProjectService.class);

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private FeaturesOnProjectsRepository featuresOnProjectsRepository;

    @Autowired
    private DisciplinesOnProjectsRepository disciplinesOnProjectsRepository;

    @Autowired
    private DisciplineRepository disciplineRepository;

    @Autowired
    private CostingRepository costingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailProperties mailProperties;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private ProjectStatusRepository projectStatusRepository;

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private KeystoreHandler keystoreHandler;

    private HTMLUtils htmlUtils = new HTMLUtils();

    //This needs to be looked at to make sure that I'm using controllers correctly
    public ProjectService(){
    }

    public List<Project> getAllProjects(){
        List<Project> projects = projectRepository.findAll();
        for(Project project: projects){
            FeatureCleaner.cleanFeaturesOnProjects(project.getFeatures());
        }
        return StatusUtils.projectListStatusChecker(projects, projectRepository, projectStatusRepository);
    }

    public List<Project> getProjectsByFeature(Long featureId){
        List<Project> s = StatusUtils.projectListStatusChecker(projectRepository.findProjectsByFeature(featureId), projectRepository, projectStatusRepository);
        return FeatureCleaner.cleanProjects(s);
    }

    public Project getProjectById(Long id) throws Exception{
        Optional<Project> project = projectRepository.findById(id);

        if(!project.isPresent()){
            throw new IllegalStateException("no project corresponds to this id");
        }
        FeatureCleaner.cleanFeaturesOnProjects(project.get().getFeatures());
        return StatusUtils.statusChecker(project.get(), projectRepository, projectStatusRepository);
    }

    public List<Project> getProjectsByIds(List<Long> ids){
        List<Project> s = StatusUtils.projectListStatusChecker(projectRepository.findProjectsByIdIs(ids), projectRepository, projectStatusRepository);
        return FeatureCleaner.cleanProjects(s);
    }

    public List<DisciplinesOnProjects> getDisciplinesOnProjectsById(Long id) throws Exception{
//        return disciplinesOnProjectsRepository.findDisciplinesOnProjectsByProject(id);
        Optional<Project> project = projectRepository.findById(id);
        if(!project.isPresent()){
            throw new IllegalStateException("no project exists with this id");
        }
        return project.get().getDisciplines();
    }

    public Project addNewProject(ProjectRequestModel projectRequestModel, Long siteId) throws Exception{
        Project p = new Project();

         saveProject(p, projectRequestModel);
         addSimilarProject(p.getId(), projectRequestModel.getSimilarProjects());

         Optional<Site> siteOptional = siteRepository.findById(siteId);
         if(!siteOptional.isPresent()){
             throw new IllegalStateException("no site exists with this id");
         }
         Site site = siteOptional.get();
         if(site.getProjects() == null){
             site.setProjects(new ArrayList<>());
         }
         site.getProjects().add(p);
         siteRepository.save(site);
        System.out.println("saved project");
         return p;
    }

    private void saveProject(Project p, ProjectRequestModel projectRequestModel) throws Exception {
        if(projectRequestModel.getProjectManager() != null){
            Optional<User> pm = userRepository.findUserByContactInfo(projectRequestModel.getProjectManager().getContactInfo());
            if(!pm.isPresent()){
                throw new IllegalStateException("no user exists with this contact information");
            }
            p.setProjectManager(pm.get());
        }
        p.setName(projectRequestModel.getName());
        p.setEndDate(projectRequestModel.getEndDate());
        p.setStartDate(projectRequestModel.getStartDate());
        p.setTotalHours(projectRequestModel.getTotalHours());
        List<FeaturesOnProjects> featuresOnProjects = projectRequestModel.getFeatures();
        for(FeaturesOnProjects feature: featuresOnProjects){
            feature.setProject(p);
        }
        p.setFeatures(featuresOnProjects);
        p.setCostingId(projectRequestModel.getCostingId());
//        p.setDisciplines(projectRequestModel.getDisciplines());

        p.setStatus(projectRequestModel.getStatus());

        projectRepository.save(p);
    }

    public void addNewDisciplineOnProject(DisciplinesOnProjectsRequestModel disciplinesOnProjectsRequestModel){


        DisciplinesOnProjectsId disciplinesOnProjectsId = new DisciplinesOnProjectsId();
        disciplinesOnProjectsId.setDiscipline(disciplinesOnProjectsRequestModel.getDiscipline().getId());
        disciplinesOnProjectsId.setProject(disciplinesOnProjectsRequestModel.getProject());


        Optional<Project> project = projectRepository.findById(disciplinesOnProjectsId.getProject());
        Optional<DisciplinesOnProjects> disciplinesOnProjects = disciplinesOnProjectsRepository.findById(disciplinesOnProjectsId);
        if(disciplinesOnProjects.isPresent() || !project.isPresent()){
            throw new IllegalStateException("this relation already exists");
        }

        DisciplinesOnProjects d = new DisciplinesOnProjects();

        if(disciplinesOnProjectsRequestModel.getCosting() == null){
            Costing c = new Costing();
            c.setCost(0L);
            costingRepository.save(c);
            d.setCosting(c);
        }

        if(d.getLeadEngineers() == null){
            d.setLeadEngineers(new ArrayList<>());
        }
        for(User u: disciplinesOnProjectsRequestModel.getLeadEngineers()){
            d.getLeadEngineers().add(u);
        }

        d.setDiscipline(disciplinesOnProjectsRequestModel.getDiscipline());
        d.setProject(project.get());
        d.setVerified(disciplinesOnProjectsRequestModel.isVerified());
        d.setEstimatedBy(disciplinesOnProjectsRequestModel.getEstimatedBy());
        d.setTotalCost(disciplinesOnProjectsRequestModel.getTotalCost());
        d.setVerifiedBy(disciplinesOnProjectsRequestModel.getVerifiedBy());

        disciplinesOnProjectsRepository.save(d);
    }


    //THIS WHOLE METHOD NEEDS TO BE LOOKED AT!!!!
    public void addNewFeaturesOnProjects(FeaturesOnProjectsRequestModel featuresOnProjectsRequestModel) throws Exception{
        //should this go here?
//        Optional<Feature> feature = featureRepository.findById(featuresOnProjectsRequestModel.getFeature());
//        if(!feature.isPresent()){
//            throw new IllegalStateException("no feature corresponds to this id");
//        }
        //this makes the id needed to search for relation entities in the table
        FeaturesOnProjectsId featuresOnProjectsId = new FeaturesOnProjectsId();
        featuresOnProjectsId.setFeature(featuresOnProjectsRequestModel.getFeature());
        featuresOnProjectsId.setProject(featuresOnProjectsRequestModel.getProject());

        Optional<FeaturesOnProjects> featuresOnProjects = featuresOnProjectsRepository.findById(featuresOnProjectsId);
        if(featuresOnProjects.isPresent()){
            throw new IllegalStateException("there is already a relation here!");
        }
        Optional<Feature> feature = featureRepository.findById(featuresOnProjectsRequestModel.getFeature());
        Optional<Project> project = projectRepository.findById(featuresOnProjectsRequestModel.getProject());
        if(!feature.isPresent() || !project.isPresent()){
            throw new IllegalStateException("something is wrong here");
        }
        FeaturesOnProjects fp = new FeaturesOnProjects();
        fp.setFeature(feature.get());
        fp.setProject(project.get());
        fp.setName(feature.get().getName());

        featuresOnProjectsRepository.save(fp);

    }

    public void updateProject(Long id, ProjectRequestModel projectRequestModel) throws Exception{
        Optional<Project> project = projectRepository.findById(id);

        if(!project.isPresent()){
            throw new IllegalStateException("no project corresponds to this id");
        }

        saveProject(project.get(), projectRequestModel);
    }

    public void deleteProject(Long id) throws Exception {
        Optional<Project> project = projectRepository.findById(id);

        if(!project.isPresent()){
            throw new IllegalStateException("no project corresponds to this id");
        }

        projectRepository.deleteById(id);
    }

    public List<Project> getSimilarProjects(Long id) throws Exception{
        Optional<Project> project = projectRepository.findById(id);
        if(!project.isPresent()){
            throw new IllegalStateException("no project corresponds to this id");
        }
        List<Project> s = StatusUtils.projectListStatusChecker(project.get().getSimilarProjects(), projectRepository, projectStatusRepository);
        FeatureCleaner.cleanProjects(s);
        return s;
    }

    public void addSimilarProject(Long project1, List<Long> similarProjects) throws Exception{
        Optional<Project> p1 = projectRepository.findById(project1);

        for(Long l: similarProjects){
            Optional<Project> p2 = projectRepository.findById(l);

            if(!p1.isPresent() || !p2.isPresent()){
                throw new IllegalStateException("couldn't find a project");
            }
            if(p1.get().getSimilarProjects() == null){
                p1.get().setSimilarProjects(new ArrayList<>());
            }
            p1.get().getSimilarProjects().add(p2.get());
        }

        projectRepository.save(p1.get());
    }

    public int createEstimateBasedOnSimilarProjects(Long projectId) throws Exception{
        Optional<Project> project = projectRepository.findById(projectId);
        if(!project.isPresent()){
            throw new IllegalStateException("no project corresponds to this id");
        }
        int total = 0;
        for(Project p: project.get().getSimilarProjects()){
            for(DisciplinesOnProjects d: p.getDisciplines()){
                total += d.getCosting().getCost();
            }
        }
        return total / project.get().getSimilarProjects().size();
    }

    public HashMap<Integer, Integer> getDisciplineEstimations(Long projectId) throws Exception{
        Optional<Project> project = projectRepository.findById(projectId);
        if(!project.isPresent()){
            throw new IllegalStateException("no project exists with this id");
        }

        HashMap<Integer, Integer> estimations = new HashMap<>();
        for(DisciplinesOnProjects d: project.get().getDisciplines()){
            int total = 0;
            int divBy = 0;

            for(Project p: project.get().getSimilarProjects()){
                for(DisciplinesOnProjects d2: p.getDisciplines()){
                    if(d2.getDiscipline() == d.getDiscipline()){
                        total += d2.getCosting().getCost();
                        divBy += 1;
                    }
                }
            }

            if(divBy != 0){
                estimations.put(Math.toIntExact(d.getDiscipline().getId()), total/divBy);
            }
        }
        return estimations;
    }

    public List<Project> getNonSimilarProjects(Long projectId) throws Exception{
        Optional<Project> project = projectRepository.findById(projectId);
        if(!project.isPresent()){
            throw new IllegalStateException("no project corresponds to this id");
        }
        List<Project> allProjects = projectRepository.findAll();
        List<Project> nonSimilar = new ArrayList<>();

        int threshold = 1; //the minimum amount of features the two sites need to share in order to be displayed

        for(Project p: allProjects){

            int i = project.get().getSimilarProjects().indexOf(p);
            if(i == -1 && p.getId() != projectId){

                int j = 0;
                for(FeaturesOnProjects f: project.get().getFeatures()){
                    if(p.getFeatures().indexOf(f) != -1){
                        j ++;
                    }
                }

                if(j >= threshold){
                    nonSimilar.add(p);
                }
            }

        }
        FeatureCleaner.cleanProjects(nonSimilar);
        return nonSimilar;
    }

    public List<Discipline> getUnAddedDisciplines(Long projectId) throws Exception{
        List<Discipline> disciplines = disciplineRepository.findAll();
        Optional<Project> project = projectRepository.findById(projectId);
        if(!project.isPresent()){
            throw new IllegalStateException("no project corresponds to this id");
        }

        List<Discipline> activeDisciplines = new ArrayList<>();
        for(DisciplinesOnProjects d: project.get().getDisciplines()){
            activeDisciplines.add(d.getDiscipline());
        }

        List<Discipline> out = new ArrayList<>();
        for(Discipline d: disciplines){
            if(activeDisciplines.indexOf(d) == -1){
                out.add(d);
            }
        }

        return out;
    }

    public void removeSimilarProject(Long projectId, Long projectToRemoveId) throws Exception{
        Optional<Project> project = projectRepository.findById(projectId);
        Optional<Project> projectToRemove = projectRepository.findById(projectToRemoveId);

        if(!project.isPresent() || !projectToRemove.isPresent()){
            throw new IllegalStateException("one or more of these projects doesn't exist");
        }

        for(Project p: project.get().getSimilarProjects()){
            if(p.getId() == projectToRemoveId){
                project.get().getSimilarProjects().remove(p);
                break;
            }
        }

        projectRepository.save(project.get());
    }

    //These methods should be incorporated into the save project method
    public void verifyDiscipline(Long projectId, Long disciplineId, Long userId) throws Exception{
        Optional<Project> project = projectRepository.findById(projectId);
        Optional<User> user = userRepository.findById(userId);
        if(!project.isPresent()){
            throw new IllegalStateException("No Project corresponds to this id");
        }
        if(!user.isPresent()){
            throw new IllegalStateException("no user corresponds to this id");
        }
        DisciplinesOnProjects discipline = null;
        for(DisciplinesOnProjects d: project.get().getDisciplines()){
            if (d.getDiscipline().getId() == disciplineId){
                discipline = d;
            }
        }
        if(discipline == null){
            throw new IllegalStateException("this discipline isn't on this project");
        }

        discipline.setVerified(true);
        discipline.setVerifiedBy(user.get());


        if(discipline.isVerificationPending()){

            discipline.setVerificationPending(false);

            StringBuilder to = new StringBuilder();
            to.append(project.get().getProjectManager().getContactInfo());
            to.append(",");
            for(User u: discipline.getLeadEngineers()){
                to.append(u.getContactInfo());
                to.append(",");
            }
//            String message = String.format("Hello,<br/>" +
//                            "You are receiving this email to let you know that %s has verified the estimation for the %s discipline" +
//                            "on <a href=\"https://uswegpprojectdep2.myigt.com/project/%s\">%s<a>. <br/>" +
//                            "They can be reached for more information at %s <br/>" +
//                            "Thanks!", user.get().getFname() + " " + user.get().getLname(),
//                    discipline.getDiscipline().getType(), project.get().getId(), project.get().getName(), user.get().getContactInfo());
            Map<Object, Object> root = new HashMap<>();
            root.put("discipline", discipline);
            root.put("project", project.get());
            String message = htmlUtils.getHTML(root, "VerificationConfirmation.html");

            String subject = String.format("%s %s Verification", project.get().getName(), discipline.getDiscipline().getType());

            EmailUtils.sendMessage(to.toString(), message, subject, this.mailProperties.getPort(), this.mailProperties.getHost());
        }
        projectRepository.save(project.get());
    }

    public void requestVerification(Long projectId, Long disciplineId) throws Exception {
        Optional<Project> project = projectRepository.findById(projectId);
        if(!project.isPresent()){
            throw new IllegalStateException("no project corresponds to this id");
        }
        DisciplinesOnProjects discipline = null;
        for(DisciplinesOnProjects d: project.get().getDisciplines()){
            if(d.getDiscipline().getId() == disciplineId){
                discipline = d;
            }
        }
        if(discipline == null){
            throw new IllegalStateException("this discipline isn't on this project");
        }

        discipline.setVerificationPending(true);
        projectRepository.save(project.get());

//        String message = String.format("Hello, <br/>" +
//                "A verification request has been made for the %s estimate on <a href=\"https://uswegpprojectdep2.myigt.com/project/%s\"> %s <a>.<br/>" +
//                "Please verify that the information and estimation are correct at your earliest convenience.<br/>" +
//                "Thanks.", discipline.getDiscipline().getType(), project.get().getId(), project.get().getName());

        Map<Object, Object> root = new HashMap<>();
        root.put("discipline", discipline);
        root.put("project", project.get());

        String message = htmlUtils.getHTML(root, "VerificationRequest.html");
        String subject = String.format("%s %s Verification Request", project.get().getName(), discipline.getDiscipline().getType());

        StringBuilder addresses = new StringBuilder();
        for(UsersOnProjects engineer: project.get().getUsers()){
            if(engineer.isActive() && engineer.getDiscipline().getId() == discipline.getDiscipline().getId()){
                addresses.append(engineer.getUser().getContactInfo() + ",");
            }
        }

        EmailUtils.sendMessage(addresses.toString(), message, subject, this.mailProperties.getPort(), this.mailProperties.getHost());
    }

    public void removeLeadEngineer(Long projectId, String discipline, Long userId){
        Optional<Project> project = projectRepository.findById(projectId);
        Optional<Discipline> disciplineOptional = disciplineRepository.findDisciplineByType(discipline);
        Optional<User> user = userRepository.findById(userId);
        if(!project.isPresent() || !disciplineOptional.isPresent() || !user.isPresent()){
            throw new IllegalStateException("something isn't in the db");
        }
        for(DisciplinesOnProjects ds: project.get().getDisciplines()){
            if(ds.getDiscipline().getType().equals(discipline)){
                ds.getLeadEngineers().remove(user.get());
            }
        }
        projectRepository.save(project.get());
    }

    public void addLeadEngineer(Long projectId, String discipline, String email) throws Exception{
        Optional<Project> project = projectRepository.findById(projectId);
        Optional<Discipline> disciplineOptional = disciplineRepository.findDisciplineByType(discipline);
        Optional<User> user = userRepository.findUserByContactInfo(email);
        if(!project.isPresent() || !disciplineOptional.isPresent() || !user.isPresent()){
            throw new IllegalStateException("something isn't in the db");
        }
        for(DisciplinesOnProjects ds: project.get().getDisciplines()){
            if(ds.getDiscipline().getType().equals(discipline) && !ds.getLeadEngineers().contains(user.get())){
                ds.getLeadEngineers().add(user.get());
            }
        }
        projectRepository.save(project.get());
    }

    public File getCameleonCosting(String projectID) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.add("Cookie", ""); // leave this, otherwise you won't get your cookie from the server
            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
            map.add("pwd", keystoreHandler.getPassword());
            map.add("name",keystoreHandler.getUser()); // meh, use my user :(

            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

            RestTemplate rt = RestTemplateUtils.getRestTemplate();

            // first try to login
            ResponseEntity<String> response = rt.exchange(CAMELEON_LOGIN, HttpMethod.POST, entity, String.class);
            String cookie = response.getHeaders().getFirst(HttpHeaders.SET_COOKIE).toString();

            rt = RestTemplateUtils.getRestTemplate();

            // authentication
            headers.set("Cookie", cookie);

            // parameters to get excel for given project id
            map = new LinkedMultiValueMap<>();
            map.add("requestP","eReport=OR_SW_COMP");
            map.add("custom","yes");
            map.add("idService","OR_SW_COMP");
            map.add("idCart","_cit_24619903421330792");
            map.add("paramval_Q_Lead_Id", projectID);

            entity = new HttpEntity<>(map, headers);

            response = rt.exchange(CAMELEON_DOC_GEN, HttpMethod.POST, entity, String.class);

            // finally grab the file
            String fileURL = response.getHeaders().getFirst("Location");

            File file = rt.execute(fileURL, HttpMethod.GET, null, clientHttpResponse -> {
                File ret = new File("./"+projectID.replaceAll("/", "-")+".xls");
                StreamUtils.copy(clientHttpResponse.getBody(), new FileOutputStream(ret));
                return ret;
            });

            return file;
        } catch (Exception e) {
            logger.error("Some error happened when decoding keystore: " + e.getClass().toString());
            e.printStackTrace();
        }

        return null;
    }

    public List<ProjectStatus> getAllStatus(){
        return projectStatusRepository.findAll();
    }


}
