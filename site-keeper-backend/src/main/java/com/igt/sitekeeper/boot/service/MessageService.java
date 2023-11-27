package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.model.*;
import com.igt.sitekeeper.model.relationmodels.DisciplinesOnProjects;
import com.igt.sitekeeper.repositories.*;
import com.igt.sitekeeper.repositories.relationrepositories.DisciplinesOnProjectsRepository;
import com.igt.sitekeeper.requestmodel.MessageRequestModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MessageService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private CostingRepository costingRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private DisciplinesOnProjectsRepository disciplinesOnProjectsRepository;

    public MessageService(){}

    public List<Message> getAllMessages(){
        return messageRepository.findAll();
    }

    public List<Message> getMessagesByCosting(Long costingId){
        Costing costingObj = new Costing();
        costingObj.setId(costingId);

        return messageRepository.findMessagesByCosting(costingObj);
    }

    public List<Message> getMessagesBySiteId(Long siteId){
        return messageRepository.findMessagesBySiteId(siteId);
    }


    public Message getMessageById(Long id) throws Exception {
        Optional<Message> message = messageRepository.findById(id);

        if(!message.isPresent()){
            throw new IllegalStateException("no message exists with this id");
        }
        return message.get();
    }

    public Costing getCostingBySite(Long siteId) throws Exception{
        Optional<Costing> costing = costingRepository.findCostingBySite(siteId);
        if(!costing.isPresent()){
            throw new IllegalStateException("no site corresponds to this id: " + siteId);
        }

        return costing.get();
    }

    public void addNewMessage(MessageRequestModel messageRequestModel, String action, Long id){
        Message message = new Message();
        message.setMessage(messageRequestModel.getMessage());
        message.setSender(messageRequestModel.getSender());
        message.setCosting(messageRequestModel.getCosting());
        message.setDateSent(messageRequestModel.getDateSent());

        messageRepository.save(message);

        List<User> toNotify = new ArrayList<>();

        if (action.equals("project")){
            Optional<DisciplinesOnProjects> project = disciplinesOnProjectsRepository.findDisciplinesOnProjectsByCosting(message.getCosting());
            for(User u: project.get().getLeadEngineers()){
                toNotify.add(u);
            }
        }
        if(toNotify.size() == 0){
            return;
        }
        StringBuilder linkBuilder = new StringBuilder();
        linkBuilder.append("/");
        linkBuilder.append(action);
        linkBuilder.append("/");
        linkBuilder.append(id);
        String link = linkBuilder.toString();
        for(User u: toNotify){

            Notification notification = new Notification();
            notification.setMessage(message.getId());
            notification.setUser(u);
            notification.setSeenByUser(false);
            notification.setLink(link.toString());
            notificationRepository.save(notification);

            simpMessagingTemplate.convertAndSend("/topic/newMessageNotification", notification);
        }
    }

    public void updateMessage(Long id, MessageRequestModel messageRequestModel) throws Exception {
        Optional<Message> message = messageRepository.findById(id);
        if(!message.isPresent()){
            throw new IllegalStateException("no message exists with this id");
        }
        message.get().setMessage(messageRequestModel.getMessage());
        message.get().setCosting(messageRequestModel.getCosting());
        message.get().setSender(messageRequestModel.getSender());
        message.get().setDateSent(messageRequestModel.getDateSent());

        messageRepository.save(message.get());
    }

    public List<Notification> getAllNotifications(){
        return notificationRepository.findAll();
    }

    public List<Notification> getNotificationsByUser(Long user){
        return notificationRepository.findNotificationByUser(user);
    }

    public List<Notification> getNotificationsByUserAndReady(Long user, boolean read){
        User userObj = new User();
        userObj.setId(user);
        return notificationRepository.findNotificationsByUserAndSeenByUser(userObj, read);
    }
    public Costing getCostingById(Long id) throws Exception{
        Optional<Costing> costing = costingRepository.findById(id);

        if(!costing.isPresent()){
            throw new IllegalStateException("no costing with this id exists");
        }
        return costing.get();
    }

    public void updateCosting(Costing costing) throws Exception{
        Optional<Costing> c = costingRepository.findById(costing.getId());
        if(!c.isPresent()){
            throw new IllegalStateException("no costing exists with this id");
        }
        c.get().setCost(costing.getCost());
        costingRepository.save(c.get());
    }

    public void updateNotification(Notification notification) throws Exception{
        Optional<Notification> n = notificationRepository.findById(notification.getId());
        if(!n.isPresent()){
            throw new IllegalStateException("no notification exists with this id");
        }
        n.get().setUser(notification.getUser());
        n.get().setMessage(notification.getMessage());
        n.get().setSeenByUser(notification.isSeenByUser());

        notificationRepository.save(n.get());
    }
}
