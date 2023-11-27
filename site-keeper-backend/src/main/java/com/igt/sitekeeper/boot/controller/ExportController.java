package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.ExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@CrossOrigin(originPatterns = "${cors.allowed.url}", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping(value="/api/export")
public class ExportController {

    @Autowired
    private ExportService exportService;

    public ExportController(){}

    @GetMapping("/exportSite")
    public void exportSite(@RequestParam Long siteId, HttpServletResponse response) throws Exception{
        response.setContentType("application/octet-stream");
        exportService.exportSingleSite(siteId, response);
    }

    @GetMapping("/exportAllSites")
    public void exportAllSites(HttpServletResponse response) throws Exception{
        response.setContentType("application/octet-stream");
        exportService.exportAllSites(response);
    }

    @GetMapping("/exportProject")
    public void exportProject(@RequestParam Long projectId, HttpServletResponse response) throws Exception{
        exportService.exportProject(projectId, response);}
}
