package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.model.Information;
import com.igt.sitekeeper.repositories.InformationRepository;
import com.igt.sitekeeper.requestmodel.InformationRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class InformationService {

    @Autowired
    private InformationRepository informationRepository;

    public InformationService(){}

    public List<Information> getAllInformation(){
        return informationRepository.findAll();
    }

    public Information getInformationById(Long id) throws Exception{
        Optional<Information> information = informationRepository.findById(id);

        if(!information.isPresent()){
            throw new IllegalStateException("no information corresponds to this id");
        }

        return information.get();
    }

    public List<Information> getInformationByDisciplineAndProject(Long discipline, Long project){
        return informationRepository.findInformationByDisciplineIdAndProjectId(discipline, project);
    }

    public List<Information> getInformationByProject(Long project){
        return informationRepository.findInformationByProjectId(project);
    }

    public void addNewInformation(InformationRequestModel informationRequestModel){
        Information information = new Information();
        information.setDisciplineId(informationRequestModel.getDisciplineId());
        information.setProjectId(informationRequestModel.getProjectId());
        information.setInfo(informationRequestModel.getInfo());
        information.setInfoName(informationRequestModel.getInfoName());

        informationRepository.save(information);
    }

    public void updateInformation(InformationRequestModel informationRequestModel, Long id) throws Exception{
        Optional<Information> information = informationRepository.findById(id);
        if(!information.isPresent()){
            throw new IllegalStateException("no information exists with this id");
        }
        information.get().setInfo(informationRequestModel.getInfo());
        information.get().setProjectId(informationRequestModel.getProjectId());
        information.get().setDisciplineId(informationRequestModel.getDisciplineId());
        information.get().setInfoName(informationRequestModel.getInfoName());
        informationRepository.save(information.get());
    }

    public void deleteInformation(Long id) throws Exception{
        Optional<Information> info = informationRepository.findById(id);
        if(!info.isPresent()){
            throw new IllegalStateException("no information exists with this id");
        }
        informationRepository.deleteById(id);
    }

}
