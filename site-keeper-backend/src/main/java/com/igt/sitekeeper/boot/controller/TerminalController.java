package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.TerminalService;
import com.igt.sitekeeper.boot.utils.RoleUtils;
import com.igt.sitekeeper.model.Terminal;
import com.igt.sitekeeper.requestmodel.TerminalRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/api/terminal")
public class TerminalController {

    private TerminalService terminalService;

    @Autowired
    public TerminalController(TerminalService terminalService){
        this.terminalService = terminalService;
    }

    @GetMapping("/getTerminalByName")
    public Terminal getTerminalByName(@RequestParam String name) throws Exception{
        return terminalService.getTerminalByName(name);
    }

    @GetMapping("/getAllTerminals")
    public List<Terminal> getAllTerminals(){
        return terminalService.getAllTerminals();
    }

    @GetMapping("/getTerminalsByIds")
    public List<Terminal> getTerminalsByIds(@RequestParam List<Long> ids){
        return terminalService.getTerminalsByIds(ids);
    }

    @GetMapping("/getTerminalsByStartOfName")
    public List<Terminal> getTerminalsByStartOfName(@RequestParam String name){
        return terminalService.getTerminalsByStartOfName(name);
    }

    @GetMapping("getTerminalsBySite")
    public List<Terminal> getTerminalsBySite(@RequestParam Long siteId){
        return terminalService.getTerminalsBySite(siteId);
    }

    //gets middleware by site id
    @GetMapping("/getMiddlewareBySite")
    public List<Terminal> getMiddlewareBySite(@RequestParam Long siteId){
        return terminalService.getMiddlewareBySite(siteId);
    }

    @GetMapping("/getMiddlewareByProject")
    public List<Terminal> getMiddlewareByProject(@RequestParam Long projectId){
        return terminalService.getMiddlewareByProject(projectId);
    }

    @GetMapping("/getHostBySite")
    public List<Terminal> getHostBySite(@RequestParam Long siteId){
        return terminalService.getHostBySite(siteId);
    }

    @GetMapping("/getHostByProject")
    public List<Terminal> getHostByProject(@RequestParam Long projectId){
        return terminalService.getHostByProject(projectId);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PostMapping("/addNewTerminal")
    public void addNewTerminal(@RequestBody TerminalRequestModel terminalRequestModel){
        terminalService.addNewTerminal(terminalRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PutMapping("/updateTerminal")
    public void updateTerminal(@RequestParam Long id, @RequestBody TerminalRequestModel terminalRequestModel) throws Exception{
        terminalService.updateTerminal(id, terminalRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @DeleteMapping("/deleteTerminal")
    public void deleteTerminal(@RequestParam Long id) throws Exception {
        terminalService.deleteTerminal(id);
    }

    @GetMapping("/getIdByName") public Long getTerminalIdByName(@RequestParam String name) {

        String decodedName;
         try {
             decodedName = URLDecoder.decode(name, "UTF-8");
         }
         catch (UnsupportedEncodingException e) {
         throw new IllegalArgumentException("Invalid URL parameter: name");
         }
         return terminalService.getTerminalIdByName(decodedName);
    }

}
