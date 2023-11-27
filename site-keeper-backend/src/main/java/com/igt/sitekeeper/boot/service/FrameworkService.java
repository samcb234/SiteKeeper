package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.model.Framework;
import com.igt.sitekeeper.repositories.FrameworkRepository;
import com.igt.sitekeeper.requestmodel.FrameworkRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FrameworkService {

    private FrameworkRepository frameworkRepository;

    @Autowired
    public FrameworkService(FrameworkRepository frameworkRepository){
        this.frameworkRepository = frameworkRepository;
    }

    public List<Framework> getAllFrameworks(){
        return frameworkRepository.findAll();
    }

    public List<Framework> getFrameworksBySite(Long siteId){
        return frameworkRepository.findFrameworksBySite(siteId);
    }

//    public Framework getFrameworkByTerminal(Long terminalId){
//        return frameworkRepository.findFrameworkByTerminalId(terminalId);
//    }

    public void addNewFramework(FrameworkRequestModel frameworkRequestModel){
        Framework f = new Framework();
        f.setDescription(frameworkRequestModel.getDescription());
        f.setName(frameworkRequestModel.getName());

        frameworkRepository.save(f);
    }

    public void updateFramework(Long id, FrameworkRequestModel frameworkRequestModel) throws Exception{
        Optional<Framework> framework = frameworkRepository.findById(id);

        if(!framework.isPresent()){
            throw new IllegalStateException("no framework corresponds to this id");
        }

        framework.get().setDescription(frameworkRequestModel.getDescription());
        framework.get().setName(frameworkRequestModel.getName());
        frameworkRepository.save(framework.get());
    }

    public void deleteFramework(Long id) {
        Optional<Framework> framework = frameworkRepository.findById(id);

        if(!framework.isPresent()){
            throw new IllegalStateException("no framework corresponds to this id");
        }

        frameworkRepository.deleteById(id);
    }
}
