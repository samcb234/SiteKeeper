package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.model.Discipline;
import com.igt.sitekeeper.repositories.DisciplineRepository;
import com.igt.sitekeeper.requestmodel.DisciplineRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DisciplineService {

    private DisciplineRepository disciplineRepository;


    @Autowired
    public DisciplineService(DisciplineRepository disciplineRepository){
        this.disciplineRepository = disciplineRepository;
    }

    public List<Discipline> getAllDisciplines(){
        return disciplineRepository.findAll();
    }

    public List<Discipline> getDisciplinesByStartOfType(String type, Long projectId){
        return disciplineRepository.findDisciplinesByStartOfName(type, projectId);
    }

    public List<Discipline> getDisciplinesByFeature(Long featureId){
        return disciplineRepository.getDisciplinesByFeature(featureId);
    }

    public Discipline addNewDiscipline(DisciplineRequestModel disciplineRequestModel){
        Discipline d = new Discipline();
        d.setType(disciplineRequestModel.getType());

        return disciplineRepository.save(d);
    }

    public Discipline getDisciplineById(Long id) throws Exception {
        Optional<Discipline> discipline = disciplineRepository.findById(id);

        if(!discipline.isPresent()){
            throw new IllegalStateException("there is no discipline with this id");
        }



        return discipline.get();
    }

    public List<Discipline> getDisciplinesByIds(List<Long> ids){
        return disciplineRepository.findDisciplinesByIdIs(ids);
    }

    public void updateDiscipline(Long id, DisciplineRequestModel disciplineRequestModel) throws Exception {
        Optional<Discipline> discipline = disciplineRepository.findById(id);

        if(!discipline.isPresent()){
            throw new IllegalStateException("No id corresponds to this discipline");
        }
        discipline.get().setType(disciplineRequestModel.getType());

        disciplineRepository.save(discipline.get());
    }

    public void deleteDiscipline(Long id) throws Exception {
        Optional<Discipline> discipline = disciplineRepository.findById(id);

        if(!discipline.isPresent()){
            throw new IllegalStateException("No id corresponds to this discipline");
        }

        disciplineRepository.deleteById(id);
    }

    public void addFeatureToDisciplineByType(String disciplineType) {
        Discipline discipline = disciplineRepository.findDisciplineByType(disciplineType).get();
      disciplineRepository.addFeatureToDisciplineByType(disciplineType); }
}
