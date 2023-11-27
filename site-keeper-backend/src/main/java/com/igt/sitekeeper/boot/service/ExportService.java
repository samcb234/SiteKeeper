package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.boot.utils.ExcelUtils;
import com.igt.sitekeeper.model.*;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnSites;
import com.igt.sitekeeper.model.relationmodels.TerminalsOnSites;
import com.igt.sitekeeper.model.relationmodels.UsersOnProjects;
import com.igt.sitekeeper.repositories.CostingRepository;
import com.igt.sitekeeper.repositories.ProjectRepository;
import com.igt.sitekeeper.repositories.SiteRepository;
import com.igt.sitekeeper.repositories.TerminalRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ExportService {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private TerminalRepository terminalRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ExportService(){}

    public void exportSingleSite(Long siteId, HttpServletResponse response) throws Exception{
        Optional<Site> siteOptional = siteRepository.findById(siteId);
        if(!siteOptional.isPresent()){
            throw new IllegalStateException("no site exists with this id");
        }
        List<Site> sites = new ArrayList<>();
        sites.add(siteOptional.get());

        Workbook workbook = siteExportHelper(sites, siteOptional.get().getName());
        terminalsAndFrameworksHelper(workbook, sites);

        exportProjects(workbook, siteOptional.get().getProjects());
        ExcelUtils.exportFile(workbook, response, siteOptional.get().getName());
    }

    public void exportAllSites(HttpServletResponse response) throws Exception{
        List<Site> sites = siteRepository.findAll();

        Workbook workbook = siteExportHelper(sites, "sites");
        terminalsAndFrameworksHelper(workbook, sites);
        ExcelUtils.exportFile(workbook, response, "allSites");
    }

    public void exportProject(Long projectId, HttpServletResponse response) throws Exception{
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if(!projectOptional.isPresent()){
            throw new IllegalStateException("no project matches this id");
        }

        Project project = projectOptional.get();

        Workbook workbook = new XSSFWorkbook();
        ExcelUtils.projectHelper(workbook, project);

        HashMap<String, String> usersPerDiscipline = new HashMap<>();

        for(UsersOnProjects user: project.getUsers()){
            if(!usersPerDiscipline.containsKey(user.getDiscipline().getType())){
                usersPerDiscipline.put(user.getDiscipline().getType(), "");
            }
            String s = usersPerDiscipline.get(user.getDiscipline().getType());
            s += user.getUser().getFname() + " " + user.getUser().getLname() + ", ";
            usersPerDiscipline.put(user.getDiscipline().getType(), s);
        }

        for(DisciplinesOnProjects discipline: project.getDisciplines()){
            ExcelUtils.disciplineHelper(workbook, discipline, usersPerDiscipline.get(discipline.getDiscipline().getType()));
        }
        ExcelUtils.exportFile(workbook, response, project.getName());

    }

    private Workbook siteExportHelper(List<Site> sites, String sheetName) throws Exception{
        Workbook workbook = new XSSFWorkbook();
        String[] fields = {"id", "name", "location", "manager", "engineers", "features", "middleware", "hosts"};

        Sheet sheet = workbook.createSheet(sheetName);

        int i = 0;
        Row header = sheet.createRow(i);
        i++;
        for(Site site: sites){


            for(int j = 0; j < fields.length; j++){
                Cell headerCell = header.createCell(j);
                headerCell.setCellValue(fields[j]);
                sheet.autoSizeColumn(j);
            }

            Row row = sheet.createRow(i);
            i++;

            for(int j = 0; j < fields.length; j++){
                Cell cell = row.createCell(j);
                String value = "";
                try{
                    switch (fields[j]){
                        case "id":
                            cell.setCellValue(site.getId());
                            sheet.autoSizeColumn(j);
                            break;
                        case "name":
                            cell.setCellValue(site.getName());
                            sheet.autoSizeColumn(j);
                            break;
                        case "location":
                            cell.setCellValue(site.getLocation());
                            sheet.autoSizeColumn(j);
                            break;
                        case "manager":
                            cell.setCellValue(site.getSiteManager().getContactInfo());
                            sheet.autoSizeColumn(j);
                            break;
                        case "engineers":
                            for(User user : site.getUsers()){
                                value += user.getFname() + " " + user.getLname() + ", ";
                            }
                            cell.setCellValue(value);
                            break;
                        case "features":
                            for(FeaturesOnSites feature : site.getFeatures()){
                                value += feature.getName() + ", ";
                            }
                            cell.setCellValue(value);
                            break;
                        case "middleware":
                            for(MiddlewareModel middleware : site.getMiddleware()){
                                value += middleware.getName() + ", ";
                            }
                            cell.setCellValue(value);
                            break;
                        case "hosts":
                            for(HostModel host : site.getHosts()){
                                value += host.getName() + ", ";
                            }
                            cell.setCellValue(value);
                            break;
                        default:
                            cell.setCellValue("something went wrong here");
                    }
                } catch (NullPointerException e){
                    System.out.println("null");
                }
            }

        }

        return workbook;
    }

    private Workbook exportProjects(Workbook workbook, List<Project> projects){

        for(Project project: projects){
            ExcelUtils.projectHelper(workbook, project);
        }
        return workbook;
    }

    private void terminalsAndFrameworksHelper(Workbook workbook, List<Site> sites){
        Sheet sheet = workbook.createSheet("Terminals and Frameworks");
        Row header = sheet.createRow(0);

        Cell cell = header.createCell(0);
        cell.setCellValue("Site Id");

        cell = header.createCell(1);
        cell.setCellValue("Site Name");

        int i = 2;

        HashMap<String, String[]> table = new HashMap<>();

        for(Terminal terminal: terminalRepository.findAll()){
            cell = header.createCell(i);
            cell.setCellValue(terminal.getName());
            table.put(terminal.getName(), new String[sites.size()]);
            i++;
        }

        int index = 0;
        for(Site site: sites){
            for(TerminalsOnSites terminalsOnSites: site.getTerminalsOnSites()){
                if(table.containsKey(terminalsOnSites.getTerminal().getName())){
                    table.get(terminalsOnSites.getTerminal().getName())[index] = terminalsOnSites.getFramework().getName();
                }
            }
            index ++;
        }

        for(int row = 1; row - 1 < sites.size(); row ++){
            Row r = sheet.createRow(row);
            Site site = sites.get(row - 1);

            cell = r.createCell(0);
            cell.setCellValue(site.getId());

            cell = r.createCell(1);
            cell.setCellValue(site.getName());


            int col = 2;
            for(String key: table.keySet()) {
                cell = r.createCell(col);
                cell.setCellValue(table.get(key)[row - 1]);
                col++;
            }
        }

        for(int j = 0; j < terminalRepository.findAll().size(); j++){
            sheet.autoSizeColumn(j);
        }
    }
}
