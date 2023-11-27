package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.ImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(originPatterns = "${cors.allowed.url}", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping(value="/api/import")
public class ImportController {
    @Autowired
    private ImportService importService;

    public ImportController(){}

    @PostMapping("/importSites")
    public void importSites(@RequestParam MultipartFile file, @RequestParam MultipartFile file2) throws Exception{
        importService.importSitesAndTerminals(file);
        importService.importPeripheralsAndFeatures(file2);
    }
}
