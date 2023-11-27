package com.igt.sitekeeper.boot.service.relationservices;

import com.igt.sitekeeper.model.Costing;
import com.igt.sitekeeper.model.Project;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.model.relationmodels.relationshipids.DisciplinesOnProjectsId;
import com.igt.sitekeeper.repositories.CostingRepository;
import com.igt.sitekeeper.repositories.ProjectRepository;
import com.igt.sitekeeper.repositories.relationrepositories.DisciplinesOnProjectsRepository;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.DisciplinesOnProjectsRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DisciplinesOnProjectsService {

    @Autowired
    private DisciplinesOnProjectsRepository disciplinesOnProjectsRepository;

    @Autowired
    private CostingRepository costingRepository;

    @Autowired
    private ProjectRepository projectRepository;


    public DisciplinesOnProjectsService(){}

    public List<DisciplinesOnProjects> getAllDisciplinesOnProjects(){
        return disciplinesOnProjectsRepository.findAll();
    }

    public List<DisciplinesOnProjects> getDisciplinesOnProjectsByProject(Long project){
        return disciplinesOnProjectsRepository.findDisciplinesOnProjectsByProject(project);
    }

    public void addDisciplinesOnProjects(DisciplinesOnProjectsRequestModel disciplinesOnProjectsRequestModel){
        DisciplinesOnProjects disciplinesOnProjects = new DisciplinesOnProjects();

        Costing costing = new Costing();
        costingRepository.save(costing);

        Optional<Project> project = projectRepository.findById(disciplinesOnProjectsRequestModel.getProject());
        if(!project.isPresent()){
            throw new IllegalStateException("no project has this id");
        }

        disciplinesOnProjects.setDiscipline(disciplinesOnProjectsRequestModel.getDiscipline());
        disciplinesOnProjects.setProject(project.get());
        disciplinesOnProjects.setCosting(costing);

        disciplinesOnProjectsRepository.save(disciplinesOnProjects);
    }
}
