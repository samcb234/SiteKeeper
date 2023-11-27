package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.model.BaseFeature;
import com.igt.sitekeeper.repositories.BaseFeatureRepository;
import com.igt.sitekeeper.requestmodel.BaseFeatureRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BaseFeatureService {

    private BaseFeatureRepository baseFeatureRepository;

    @Autowired
    public BaseFeatureService(BaseFeatureRepository baseFeatureRepository){
        this.baseFeatureRepository = baseFeatureRepository;
    }

    public List<BaseFeature> getAllBaseFeatures() {
        return baseFeatureRepository.findAll();
    }

    public BaseFeature getBaseFeatureById(Long id) throws Exception {
        Optional<BaseFeature> baseFeature = baseFeatureRepository.findById(id);

        if(!baseFeature.isPresent()){
            throw new IllegalStateException("no base feature corresponds to this id");
        }

        return baseFeature.get();
    }

    public void addBaseFeature(BaseFeatureRequestModel baseFeatureRequestModel){
        BaseFeature baseFeature = new BaseFeature();

        baseFeature.setCost(baseFeatureRequestModel.getCost());
        baseFeature.setImg(baseFeatureRequestModel.getImg());
        baseFeature.setDescription(baseFeatureRequestModel.getDescription());
        baseFeature.setName(baseFeatureRequestModel.getName());

        baseFeatureRepository.save(baseFeature);
    }
}
