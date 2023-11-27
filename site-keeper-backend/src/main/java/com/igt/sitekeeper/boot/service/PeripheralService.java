package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.model.Peripheral;
import com.igt.sitekeeper.model.relationmodels.PeripheralsOnTerminals;
import com.igt.sitekeeper.model.relationmodels.relationshipids.PeripheralsOnTerminalsId;
import com.igt.sitekeeper.repositories.PeripheralRepository;
import com.igt.sitekeeper.repositories.relationrepositories.PeripheralsOnTerminalsRepository;
import com.igt.sitekeeper.requestmodel.PeripheralRequestModel;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.PeripheralsOnTerminalsRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PeripheralService {

    @Autowired
    private PeripheralRepository peripheralRepository;

    @Autowired
    private PeripheralsOnTerminalsRepository peripheralsOnTerminalsRepository;

    public PeripheralService(){
    }

    public List<Peripheral> getAllPeripherals(){
        return peripheralRepository.findAll();
    }

    public List<Peripheral> getPeripheralsByStartOfName(String name){
        return peripheralRepository.findPeripheralsByStartOfName(name);
    }

    public void addNewPeripheral(PeripheralRequestModel peripheralRequestModel){
        Peripheral p = new Peripheral();
        p.setDescription(peripheralRequestModel.getDescription());
        p.setImg(peripheralRequestModel.getImg());
        p.setName(peripheralRequestModel.getName());

        peripheralRepository.save(p);
    }

    public void updatePeripheral(Long id, PeripheralRequestModel peripheralRequestModel) throws Exception {
        Optional<Peripheral> peripheral = peripheralRepository.findById(id);

        if(!peripheral.isPresent()) {
            throw new IllegalStateException("no peripheral corresponds to this id");
        }

        peripheral.get().setDescription(peripheralRequestModel.getDescription());
        peripheral.get().setImg(peripheralRequestModel.getImg());

        peripheralRepository.save(peripheral.get());
    }

    public void deletePeripheral(Long id) throws Exception {
        Optional<Peripheral> peripheral = peripheralRepository.findById(id);

        if(!peripheral.isPresent()) {
            throw new IllegalStateException("no peripheral corresponds to this id");
        }

        peripheralRepository.deleteById(id);
    }

    public void addNewPeripheralOnTerminal(PeripheralsOnTerminalsRequestModel peripheralsOnTerminalsRequestModel) throws Exception{
        PeripheralsOnTerminalsId id = new PeripheralsOnTerminalsId();
        id.setPeripheral(peripheralsOnTerminalsRequestModel.getPeripheral());
        id.setTerminal(peripheralsOnTerminalsRequestModel.getTerminal());

        Optional<PeripheralsOnTerminals> peripheralsOnTerminals = peripheralsOnTerminalsRepository.findById(id);

        if(peripheralsOnTerminals.isPresent()){
            throw new IllegalStateException("this relation already exists!");
        }

        PeripheralsOnTerminals p = new PeripheralsOnTerminals(peripheralsOnTerminalsRequestModel.getPeripheral(),
                peripheralsOnTerminalsRequestModel.getTerminal());

        peripheralsOnTerminalsRepository.save(p);
    }
}
