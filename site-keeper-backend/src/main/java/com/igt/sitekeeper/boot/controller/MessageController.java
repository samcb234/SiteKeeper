package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.MessageService;
import com.igt.sitekeeper.boot.utils.RoleUtils;
import com.igt.sitekeeper.model.Costing;
import com.igt.sitekeeper.model.Message;
import com.igt.sitekeeper.model.Notification;
import com.igt.sitekeeper.requestmodel.MessageRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin(originPatterns = "${cors.allowed.url}", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping(value = "/api/message")
public class MessageController {
    @Autowired
    private MessageService messageService;

    public MessageController(){}

    @GetMapping("/getAllMessages")
    public List<Message> getAllMessages(){
        return messageService.getAllMessages();
    }

    @GetMapping("/getMessagesByCosting")
    public List<Message> getMessagesByCosting(@RequestParam Long costing){
        return messageService.getMessagesByCosting(costing);
    }

    @GetMapping("/getMessagesBySite")
    public List<Message> getMessagesBySite(@RequestParam Long siteId){
        return messageService.getMessagesBySiteId(siteId);
    }


    @GetMapping("/getMessageById")
    public Message getMessageById(@RequestParam Long id) throws Exception {
        return messageService.getMessageById(id);
    }

    @GetMapping("/getAllNotifications")
    public List<Notification> getAllNotifications(){
        return messageService.getAllNotifications();
    }

    @GetMapping("/getNotificationsByUser")
    public List<Notification> getNotificationsByUser(@RequestParam Long user) throws Exception{
        return messageService.getNotificationsByUser(user);
    }

    @GetMapping("/getNotificationsByUserAndRead")
    public List<Notification> getNotificationsByUserAndRead(@RequestParam Long user, @RequestParam boolean read) throws Exception{
        return messageService.getNotificationsByUserAndReady(user, read);

    }

    @GetMapping("/getCostingBySite")
    public Costing getCostingBySite(@RequestParam Long siteId) throws Exception{
        return messageService.getCostingBySite(siteId);
    }

    @GetMapping("/getCostingById")
    public Costing getCostingById(@RequestParam Long id) throws Exception{
        return messageService.getCostingById(id);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER, RoleUtils.USER})
    @PostMapping("/addNewMessage")
    public void addNewMessage(@RequestBody MessageRequestModel messageRequestModel, @RequestParam String action, @RequestParam Long id){
        messageService.addNewMessage(messageRequestModel, action, id);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER, RoleUtils.USER})
    @PutMapping("/updateMessage")
    public void updateMessage(@RequestParam Long id, @RequestBody MessageRequestModel messageRequestModel) throws Exception{
        messageService.updateMessage(id, messageRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER, RoleUtils.USER})
    @PutMapping("/updateNotification")
    public void updateNotification(@RequestBody Notification notification) throws Exception{
        messageService.updateNotification(notification);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PutMapping("/updateCosting")
    public void updateCosting(@RequestBody Costing costing) throws Exception {
        messageService.updateCosting(costing);
    }

}
