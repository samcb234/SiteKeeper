package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.boot.utils.SharepointUtils;
import com.igt.sitekeeper.model.*;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnSites;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnSites;
import com.igt.sitekeeper.model.relationmodels.TerminalsOnSites;
import com.igt.sitekeeper.repositories.*;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

@Service
@Transactional
public class ImportService {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private TerminalRepository terminalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FrameworkRepository frameworkRepository;

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private PeripheralRepository peripheralRepository;

    @Autowired
    private DisciplineRepository disciplineRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ProjectStatusRepository projectStatusRepository;

    public ImportService(){}

    private void roleAndStatusChecks(){
        String[] roles = {"admin", "manager", "engineer", "user"};
        for(String role: roles){
            Optional<RoleModel> roleOptional = roleRepository.findRoleModelByRole(role);
            if(!roleOptional.isPresent()){
                RoleModel newRole = new RoleModel();
                newRole.setRole(role);
                roleRepository.save(newRole);
            }
        }

        String[] projectStatus = {"costing", "requirements", "development", "design", "testing", "finished"};
        for(String status: projectStatus){
            Optional<ProjectStatus> p = projectStatusRepository.findProjectStatusByStatus(status);
            if(!p.isPresent()){
                ProjectStatus newStatus = new ProjectStatus();
                newStatus.setStatus(status);
                projectStatusRepository.save(newStatus);
            }
        }

        String[] disciplines = {"terminal", "middleware", "host"};
        for(String discipline: disciplines){
            Optional<Discipline> disciplineOptional = disciplineRepository.findDisciplineByType(discipline);
            if(!disciplineOptional.isPresent()){
                Discipline newDiscipline = new Discipline();
                newDiscipline.setType(discipline);
                disciplineRepository.save(newDiscipline);
            }
        }
    }
    public void importSitesAndTerminals(MultipartFile multipartFile) throws Exception{

        roleAndStatusChecks();

        SharepointUtils sharepointUtils = new SharepointUtils();

        Workbook workbook = new XSSFWorkbook(multipartFile.getInputStream());

        Sheet sheet = workbook.getSheetAt(0);

        HashMap<Integer, String> terminals = new HashMap<>();
        Row header = sheet.getRow(0);
        for(int i = 2; i < 15; i++){
            terminals.put(i, header.getCell(i).getStringCellValue());
        }

        Discipline d = disciplineRepository.findDisciplineByType("terminal").get();
        RoleModel role = roleRepository.findRoleModelByRole("engineer").get();
        for(int i = 1; i < sheet.getLastRowNum(); i ++){
            Row row = sheet.getRow(i);

            Site site = new Site();
            site.setName(row.getCell(0).getStringCellValue());
            Costing costing = new Costing();
            site.setAbbreviation(row.getCell(1).getStringCellValue());
            site.setBetslipId(row.getCell(17).getNumericCellValue());
            String email = row.getCell(16).getStringCellValue();
            site.setLogo(row.getCell(18).getStringCellValue());

            DisciplinesOnSites terminalDiscipline = new DisciplinesOnSites();
            if(!email.equals("") && email != null){
                User user;
                Optional<com.igt.sitekeeper.model.User> userOptional = userRepository.findUserByContactInfo(email);
                if(!userOptional.isPresent()){
                    String[] fullName;
                    try{
                        fullName = sharepointUtils.getUserByEmail(email).getDisplayName().split(" ");
                    } catch (NullPointerException e){
                        fullName = new String[2];
                        fullName[0] = "";
                        fullName[1] = "";
                    }
                    user = new User();
                    user.setFname(fullName[1]);
                    user.setLname(fullName[0].replace(",", ""));
                    user.setContactInfo(email);
                    user.setRole(role);
                    user.setPassword("password1234");
                    userRepository.save(user);
                }else{
                    user = userOptional.get();
                }
                terminalDiscipline.setLeadEngineers(new ArrayList<>());
                terminalDiscipline.getLeadEngineers().add(user);
            }

            terminalDiscipline.setDiscipline(d);
            terminalDiscipline.setSite(site);


            site.setDisciplines(new ArrayList<>());
            site.getDisciplines().add(terminalDiscipline);

            for(int j = 2; j < 15; j++){ //setting terminals and frameworks on sites
                String frameworkName = row.getCell(j).getStringCellValue();
                if(!frameworkName.equals(" ") && !frameworkName.equals("-") && frameworkName != null){

                    Optional<Terminal> terminalOptional = terminalRepository.findTerminalByName(terminals.get(j));
                    Optional<Framework> frameworkOptional = frameworkRepository.findFrameworkByName(frameworkName);

                    Terminal terminal;
                    Framework framework;

                    if(!terminalOptional.isPresent()){
                        terminal = new Terminal();
                        terminal.setName(terminals.get(j));
                        terminalRepository.save(terminal);
                    } else {
                        terminal = terminalOptional.get();
                    }

                    if(!frameworkOptional.isPresent()){
                        framework = new Framework();
                        framework.setName(frameworkName);
                        frameworkRepository.save(framework);
                    } else {
                        framework = frameworkOptional.get();
                    }

                    TerminalsOnSites terminalsOnSites = new TerminalsOnSites();

                    terminalsOnSites.setSite(site);
                    terminalsOnSites.setTerminal(terminal);
                    terminalsOnSites.setFramework(framework);

                    if(site.getTerminalsOnSites() == null){
                        site.setTerminalsOnSites(new ArrayList<TerminalsOnSites>());
                    }

                    site.getTerminalsOnSites().add(terminalsOnSites);
                }

            }

            siteRepository.save(site);

        }
        workbook.close();
    }

    public void importPeripheralsAndFeatures(MultipartFile multipartFile) throws Exception{
        roleAndStatusChecks();
        Workbook workbook = new XSSFWorkbook(multipartFile.getInputStream());
        try{
            sheet1Helper(workbook.getSheetAt(0));
            sheet2Helper(workbook.getSheetAt(1));
            workbook.close();
        } catch (Exception e){
            System.out.println(e.getMessage());
            workbook.close();
        }
    }

    private void sheet1Helper(Sheet sheet) throws Exception{


        Row header = sheet.getRow(2);
        Row status = sheet.getRow(3);

        for(int i = 1; i < header.getLastCellNum(); i++){
            if(status.getCell(i).getStringCellValue().equals("No") || header.getCell(i).getStringCellValue().equals("")){
                continue;
            }
            Optional<Site> siteOptional = siteRepository.findByAbbreviation(header.getCell(i).getStringCellValue());
            if(!siteOptional.isPresent()){
                throw new IllegalStateException("can't find site");
            }

            Site site = siteOptional.get();
            TerminalsOnSites terminal = findCorrectTerminal("Flex/Rpro", site);

            for(int j = 6; j < sheet.getLastRowNum(); j++){
                if(j==18 || j == 24 || j == 25 || j == 50 || j == 55 || j ==70 || j == 76 || j == 78 ||
                        (82 <= j && j <=85) || j == 96 || j >= 103){
                    continue;
                }

                switch (j){
                    case 26:
                        terminal = findCorrectTerminal("Compact", site);
                        continue;
                    case 37:
                        terminal = findCorrectTerminal("GT1200", site);
                        continue;
                    case 51:
                        terminal = findCorrectTerminal("GT28", site);
                        continue;
                    case 55:
                        terminal = findCorrectTerminal("GT20", site);
                        continue;
                    case 59:
                        terminal = findCorrectTerminal("GT28v2", site);
                        continue;
                    case 63:
                        terminal = findCorrectTerminal("GT20v2", site);
                        continue;
                    case 67:
                        terminal = findCorrectTerminal("Ultra", site);
                        continue;
                    case 72:
                        terminal = findCorrectTerminal("GTD", site);
                        continue;
                    case 79:
                        terminal = findCorrectTerminal("HTT", site);
                        continue;
                    case 86:
                        terminal = findCorrectTerminal("VCU", site);
                        continue;
                    case 88:
                        terminal = findCorrectTerminal("ESLI", site);
                        continue;
                    case 101:
                        terminal = findCorrectTerminal("MINIVCU", site);
                        continue;
                    default:
                        break;
                }

                if(terminal == null){
                    continue;
                }
                Row row = sheet.getRow(j);
                if(row.getCell(i) != null && !row.getCell(i).getStringCellValue().equals("")){
                    try{
                        Peripheral peripheral;
                        Cell c = row.getCell(0);
                        Optional<Peripheral> peripheralOptional = peripheralRepository.findPeripheralByName(c.getStringCellValue());

                        if(!peripheralOptional.isPresent()){
                            peripheral = new Peripheral();
                            peripheral.setName(c.getStringCellValue());
                            peripheralRepository.save(peripheral);
                        }else {
                            peripheral = peripheralOptional.get();
                        }

                        if(terminal.getPeripherals() == null){
                            terminal.setPeripherals(new ArrayList<>());
                        }
                        terminal.getPeripherals().add(peripheral);
                    } catch (Exception e){
                        System.out.println("ERROR AT CELL "+j+": " + e.getMessage());
                        continue;
                    }
                }

            }
            siteRepository.save(site);
        }
    }

    private TerminalsOnSites findCorrectTerminal(String name, Site site){
        for(TerminalsOnSites t : site.getTerminalsOnSites()){
            if(t.getTerminal().getName().equals(name)){
                return t;
            }
        }
        return null;
    }

    private void sheet2Helper(Sheet sheet) throws Exception{

        HashMap<Integer, Feature> features = new HashMap<>();
        Discipline terminal = disciplineRepository.findDisciplineByType("terminal").get();
        for(int i = 1; i < 25; i ++){
            Feature feature = new Feature();
            Row row = sheet.getRow(1);
            if(i > 16){
                row = sheet.getRow(0);
            }

            feature.setName(row.getCell(i).getStringCellValue());
            feature.setDisciplines(new ArrayList<>());
            feature.getDisciplines().add(terminal);
            featureRepository.save(feature);

            features.put(i, feature);
        }


        for(int i = 2; i < sheet.getLastRowNum(); i++){
            Row row = sheet.getRow(i);
            Optional<Site> siteOptional = siteRepository.findByAbbreviation(row.getCell(0).getStringCellValue());
            if(!siteOptional.isPresent()){
                System.out.println("couldn't find site " + row.getCell(0).getStringCellValue());
                continue;
            }
            Site site = siteOptional.get();
            if(site.getFeatures() == null){
                site.setFeatures(new ArrayList<>());
            }

            for(int j = 1; j < 25; j++){
                if(!row.getCell(j).getStringCellValue().equals("")){
                    FeaturesOnSites fs = new FeaturesOnSites();
                    fs.setSite(site);
                    fs.setFeature(features.get(j));
                    fs.setName(features.get(j).getName());
                    site.getFeatures().add(fs);
                }
            }

            siteRepository.save(site);
        }
    }
}
