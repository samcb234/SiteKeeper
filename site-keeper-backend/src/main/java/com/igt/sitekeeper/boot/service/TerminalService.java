package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.model.TerminalsAndFrameworks;
import com.igt.sitekeeper.model.Terminal;
import com.igt.sitekeeper.model.relationmodels.ProjectsOnSites;
import com.igt.sitekeeper.model.relationmodels.TerminalsOnProjects;
import com.igt.sitekeeper.model.relationmodels.TerminalsOnSites;
import com.igt.sitekeeper.repositories.FrameworkRepository;
import com.igt.sitekeeper.repositories.TerminalRepository;
import com.igt.sitekeeper.repositories.relationrepositories.TerminalsOnProjectsRepository;
import com.igt.sitekeeper.repositories.relationrepositories.TerminalsOnSitesRepository;
import com.igt.sitekeeper.requestmodel.TerminalRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TerminalService {

    @Autowired
    private TerminalRepository terminalRepository;

    @Autowired
    private TerminalsOnSitesRepository terminalsOnSitesRepository;

    @Autowired
    private FrameworkRepository frameworkRepository;

    @Autowired
    private TerminalsOnProjectsRepository terminalsOnProjectsRepository;
    public TerminalService(){
    }

    public List<Terminal> getAllTerminals(){
        return terminalRepository.findAll();
    }

    public List<Terminal> getTerminalsByIds(List<Long> ids){
        return terminalRepository.findTerminalsByIdIs(ids);
    }

    public List<Terminal> getTerminalsByStartOfName(String name){
        return terminalRepository.findTerminalByStartOfName(name);
    }

    public List<Terminal> getTerminalsBySite(Long siteId){
        return terminalRepository.findTerminalsBySite(siteId);
    }

    //GET MIDDLEWARE BY SITE B/C MIDDLEWARE AND TERMINAL HAVE THE SAME FIELDS
    public List<Terminal> getMiddlewareBySite(Long siteId){
        return terminalRepository.findMiddlewareBySite(siteId);
    }

    public List<Terminal> getMiddlewareByProject(Long projectId){
        return terminalRepository.findMiddlewareByProject(projectId);
    }

    public Terminal getTerminalByName(String name) throws Exception{
        Optional<Terminal> terminal = terminalRepository.findTerminalByName(name);
        if(!terminal.isPresent()){
            throw new IllegalStateException("no terminal has name "+ name);
        }
        return terminal.get();
    }


    //GET HOST BY SITE BC HOST AND TERMINAL HAVE THE SAME FIELDS
    public List<Terminal> getHostBySite(Long siteId){
        return terminalRepository.findHostBySite(siteId);
    }

    public List<Terminal> getHostByProject(Long projectId){
        return terminalRepository.findHostByProject(projectId);
    }

    public void addNewTerminal(TerminalRequestModel terminalRequestModel) {
        Terminal t = new Terminal();
        t.setDescription(terminalRequestModel.getDescription());
        t.setName(terminalRequestModel.getName());
        t.setImg(terminalRequestModel.getImg());

        terminalRepository.save(t);
    }

    public void updateTerminal(Long id, TerminalRequestModel terminalRequestModel) throws Exception{
        Optional<Terminal> terminal = terminalRepository.findById(id);

        if (!terminal.isPresent()){
            throw new IllegalStateException("no terminal corresponds to this id");
        }

        terminal.get().setDescription(terminalRequestModel.getDescription());
        terminal.get().setName(terminalRequestModel.getName());
        terminal.get().setImg(terminalRequestModel.getImg());

        terminalRepository.save(terminal.get());
    }

    public void deleteTerminal(Long id) throws Exception{
        Optional<Terminal> terminal = terminalRepository.findById(id);

        if(!terminal.isPresent()){
            throw new IllegalStateException("no terminal corresponds to this id");
        }

        terminalRepository.deleteById(id);
    }

    public Long getTerminalIdByName(String name){

        return terminalRepository.getTerminalByName(name).getId();
    }



}
