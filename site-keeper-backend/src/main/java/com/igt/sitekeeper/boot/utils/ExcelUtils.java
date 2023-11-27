package com.igt.sitekeeper.boot.utils;

import com.igt.sitekeeper.model.*;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.model.relationmodels.FeaturesOnProjects;
import com.igt.sitekeeper.model.relationmodels.UsersOnProjects;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

public class ExcelUtils {

    public static void projectHelper(Workbook workbook, Project project) {
        String[] fields = {"id", "name","total cost", "disciplines", "costing per discipline",
                "features", "terminals", "frameworks", "middleware", "hosts", "engineers"};

        Sheet sheet = workbook.createSheet(project.getName());
        Row row = sheet.createRow(0);

        for(int i = 0; i < fields.length; i++){
            Cell cell = row.createCell(i);
            cell.setCellValue(fields[i]);
            sheet.autoSizeColumn(i);
        }

        row = sheet.createRow(1);

        for(int i = 0; i < fields.length; i++){
            String value = "";
            Cell cell = row.createCell(i);
            switch (fields[i]){
                case "id":
                    cell.setCellValue(project.getId());
                    sheet.autoSizeColumn(i);
                    break;
                case "name":
                    cell.setCellValue(project.getName());
                    sheet.autoSizeColumn(i);
                    break;
                case "manager":
                    cell.setCellValue(project.getProjectManager().getContactInfo());
                    sheet.autoSizeColumn(i);
                    break;
                case "engineers":
                    for(UsersOnProjects user : project.getUsers()){
                        value += user.getUser().getFname() + " " + user.getUser().getLname() + ", ";
                    }
                    cell.setCellValue(value);
                    break;
                case "features":
                    for(FeaturesOnProjects feature : project.getFeatures()){
                        value += feature.getName() + ", ";
                    }
                    cell.setCellValue(value);
                    break;
                case "frameworks":
                    for(Framework framework : project.getFrameworks()){
                        value += framework.getName() + ", ";
                    }
                    cell.setCellValue(value);
                    break;
                case "terminals":
                    for(Terminal terminal : project.getTerminals()){
                        value += terminal.getName() + ", ";
                    }
                    cell.setCellValue(value);
                    break;
                case "middleware":
                    for(MiddlewareModel terminal : project.getMiddleware()){
                        value += terminal.getName() + ", ";
                    }
                    cell.setCellValue(value);
                    break;
                case "hosts":
                    for(HostModel terminal : project.getHosts()){
                        value += terminal.getName() + ", ";
                    }
                    cell.setCellValue(value);
                    break;
                case "disciplines":
                    for(DisciplinesOnProjects disciplines: project.getDisciplines()){
                        value += disciplines.getDiscipline().getType() + ", ";
                    }
                    cell.setCellValue(value);
                    break;
                case "total cost":
                    cell.setCellValue(project.getTotalHours());
                    sheet.autoSizeColumn(i);
                    break;
                case "costing per discipline":
                    for(DisciplinesOnProjects disciplines: project.getDisciplines()){
                        value += disciplines.getCosting().getCost() + ", ";
                    }
                    cell.setCellValue(value);
                    break;
                default:
                    cell.setCellValue("something went wrong here lol");
            }
        }
    }

    public static void disciplineHelper(Workbook workbook, DisciplinesOnProjects discipline, String users){
        Sheet sheet = workbook.createSheet(discipline.getDiscipline().getType());
        Row row = sheet.createRow(0);
        String[] fields = {"costing id", "cost", "manager", "engineers"};
        for(int i = 0; i < fields.length; i++){
            Cell cell = row.createCell(i);
            cell.setCellValue(fields[i]);
        }

        row = sheet.createRow(1);
        Cell cell = row.createCell(0);

        cell = row.createCell(1);
        cell.setCellValue(discipline.getCosting().getCost());

        cell = row.createCell(2);
        StringBuilder leadEngineers = new StringBuilder();
        for(User u: discipline.getLeadEngineers()){
            leadEngineers.append(u.getFname());
            leadEngineers.append(" ");
            leadEngineers.append(u.getLname());
            leadEngineers.append(", ");
        }
        cell.setCellValue(leadEngineers.toString());

        cell = row.createCell(3);
        cell.setCellValue(users);
    }

    public static void exportFile(Workbook workbook, HttpServletResponse response, String filename)throws Exception{
        response.setHeader("Content-Disposition", "attachment; filename=" + filename + ".xlsx");

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
    }


}
