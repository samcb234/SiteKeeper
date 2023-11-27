package com.igt.sitekeeper.boot.controller;

import com.igt.sitekeeper.boot.service.UserService;
import com.igt.sitekeeper.boot.utils.RoleUtils;
import com.igt.sitekeeper.model.RoleModel;
import com.igt.sitekeeper.model.User;
import com.igt.sitekeeper.requestmodel.UserRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;


@CrossOrigin(originPatterns = "${cors.allowed.url}", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return this.userService.getAllUsers();
    }

    @GetMapping("/getUserByContactInfo")
    public User getUserByContactInfo(@RequestParam String contactInfo) {
        return userService.getUserByContactInfo(contactInfo);
    }

    @GetMapping("/getUserById")
    public User getUserById(@RequestParam Long id) throws Exception{
        return userService.getUserById(id);
    }

    @GetMapping("/getUsersByIds")
    public List<User> getUsersByIds(@RequestParam List<Long> ids){
        return userService.getUsersByIds(ids);
    }

    @GetMapping("/getUsersByContactInfoAndSite")
    public List<User> getUsersByContactInfoAndSite(@RequestParam String contactInfo, @RequestParam Long siteId){
        return userService.getUsersByContactInfoAndSite(contactInfo, siteId);
    }

    @GetMapping("/getUsersBySiteId")
    public List<User> getUsersBySiteId(@RequestParam Long siteId){
        return userService.getUsersBySiteId(siteId);
    }

    @RolesAllowed({RoleUtils.ADMIN})
    @PostMapping("/makeNewUser")
    public void makeNewUser(@RequestBody UserRequestModel userRequestModel) throws Exception{
        this.userService.addNewUser(userRequestModel);
    }

    @RolesAllowed({})
    @PutMapping("/updateUser")
    public void updateUser(@RequestParam Long id, @RequestBody UserRequestModel userRequestModel) throws Exception {
        userService.updateUser(id, userRequestModel);
    }

    @RolesAllowed({RoleUtils.ADMIN})
    @DeleteMapping("/deleteUser")
    public void deleteUser(@RequestParam Long id) throws Exception{
        userService.deleteUser(id);
    }

    @GetMapping("/getAllRoles")
    public List<RoleModel> getAllRoles(){
        return userService.getAllRoles();
    }

    @GetMapping("/isUserActiveOnSite")
    public boolean isUserActiveOnSite(@RequestParam Long userId, @RequestParam Long siteId){
        return userService.isUserActiveOnSite(userId, siteId);
    }

    @GetMapping("/getLoggedInUser")
    public User getLoggedInUser()throws Exception{
//        return userService.getUserById((long)1); //this is used during testing to grant admin privileges
        return userService.getLoggedInUser();
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @GetMapping("/getSuggestedUsers")
    public List<String> getSuggestedUsers(@RequestParam String email) throws Exception{
        return userService.suggestIGTEmails(email);
    }

    @RolesAllowed({RoleUtils.ADMIN, RoleUtils.MANAGER, RoleUtils.ENGINEER})
    @PostMapping("/addNewUserFromEmail")
    public User addNewUserFromEmail(@RequestParam String email, @RequestParam String role) throws Exception{
        return userService.addNewUserFromEmail(email, role);
    }

}
