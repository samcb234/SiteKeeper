package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.PeripheralService;
import com.igt.sitekeeper.boot.utils.RoleUtils;
import com.igt.sitekeeper.model.Peripheral;
import com.igt.sitekeeper.requestmodel.PeripheralRequestModel;
import com.igt.sitekeeper.requestmodel.relationrequestmodels.PeripheralsOnTerminalsRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/peripheral")
public class PeripheralController {

    private PeripheralService peripheralService;

    @Autowired
    public PeripheralController(PeripheralService peripheralService){
        this.peripheralService = peripheralService;
    }

    @GetMapping("/getAllPeripherals")
    public List<Peripheral> getAllPeripherals(){
        return peripheralService.getAllPeripherals();
    }

    @GetMapping("/getPeripheralsByStartOfName")
    public List<Peripheral> getPeripheralsByStartOfName(@RequestParam String name){
        return peripheralService.getPeripheralsByStartOfName(name);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PostMapping("/addNewPeripheral")
    public void addNewPeripheral(@RequestBody PeripheralRequestModel peripheralRequestModel){
        peripheralService.addNewPeripheral(peripheralRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PostMapping("/addNewPeripheralsOnTerminals")
    public void addNewPeripheralsOnTerminals(@RequestBody PeripheralsOnTerminalsRequestModel p) throws Exception{
        peripheralService.addNewPeripheralOnTerminal(p);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PutMapping("/updatePeripheral")
    public void updatePeripheral(@RequestParam Long id, @RequestBody PeripheralRequestModel peripheralRequestModel)throws Exception {
        peripheralService.updatePeripheral(id, peripheralRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN})
    @DeleteMapping("/deletePeripheral")
    public void deletePeripheral(@RequestParam Long id) throws Exception{
        peripheralService.deletePeripheral(id);
    }
}
