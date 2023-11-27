package com.igt.sitekeeper.boot.service;

import com.igt.sitekeeper.boot.utils.EmailUtils;
import com.igt.sitekeeper.boot.utils.SharepointUtils;
import com.igt.sitekeeper.model.RoleModel;
import com.igt.sitekeeper.model.User;
import com.igt.sitekeeper.repositories.RoleRepository;
import com.igt.sitekeeper.repositories.UserRepository;
import com.igt.sitekeeper.requestmodel.UserRequestModel;
import com.igt.sitekeeper.service.MailProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.saml2.provider.service.authentication.DefaultSaml2AuthenticatedPrincipal;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MailProperties mailProperties;

    private SharepointUtils sharepointUtils;
    public UserService(){
        this.sharepointUtils = new SharepointUtils();
    }

    public List<User> getAllUsers(){
        List<User> users = userRepository.findAll();
        return users;
    }

    public List<User> getUsersByIds(List<Long> ids){
        return userRepository.findUserByIdIs(ids);
    }

    public User getUserById(Long id) throws Exception{
        Optional<User> user = userRepository.findById(id);

        if(!user.isPresent()){
            throw new IllegalStateException("no user corresponds to this id");
        }

        return user.get();
    }

    public User getUserByContactInfo(String contactInfo) {
        Optional<User> user = userRepository.findUserByContactInfo(contactInfo);

        if(!user.isPresent()){
            return null;
        }

        return user.get();
    }

    public List<User> getUsersByContactInfoAndSite(String contactInfo, Long site){
        return userRepository.findUsersByContactInfoAndSite(contactInfo, site);
    }

    public List<User> getUsersBySiteId(Long siteId){
        return userRepository.findUsersBySite(siteId);
    }

    public void addNewUser(UserRequestModel userRequestModel) throws Exception{
        User user = new User();
        saveUserChanges(user, userRequestModel);
    }

    public void updateUser(Long id, UserRequestModel userRequestModel) throws Exception {
        Optional<User> user = userRepository.findById(id);

        if(!user.isPresent()){
            throw new IllegalStateException("no user corresponds to this id");
        }

        saveUserChanges(user.get(), userRequestModel);
    }

    private void saveUserChanges(User user, UserRequestModel userRequestModel) throws Exception{
        if(userRequestModel.getRole() == null){
            user.setRole(roleRepository.findRoleModelByRole("user").get());
        }else {
            Optional<RoleModel> roleModel = roleRepository.findById(userRequestModel.getRole());
            if(!roleModel.isPresent()) {
                throw new IllegalStateException("no role corresponds to this id");
            }
            user.setRole(roleModel.get());
        }
        if(userRequestModel.getFname() == null){
            throw new IllegalArgumentException("name cannot be null");
        }

        user.setFname(userRequestModel.getFname());
        user.setLname(userRequestModel.getLname());
        user.setContactDate(userRequestModel.getContactDate());
        user.setContactInfo(userRequestModel.getContactInfo());
        user.setContactPeriod(userRequestModel.getContactPeriod());
        user.setPassword("password1234");

        userRepository.save(user);
    }

    public void deleteUser(Long id) throws Exception {
        Optional<User> user = userRepository.findById(id);

        if(!user.isPresent()){
            throw new IllegalStateException("no user corresponds to this id");
        }

        userRepository.deleteById(id);
    }

    public List<RoleModel> getAllRoles(){
        return roleRepository.findAll();
    }

    public boolean isUserActiveOnSite(Long user, Long site) {
        return userRepository.isUserActiveOnSite(user, site);
    }

    public User getLoggedInUser() throws Exception{
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.getPrincipal() instanceof User) {
            return (User) auth.getPrincipal();
        } else if (auth != null && auth.getPrincipal() instanceof DefaultSaml2AuthenticatedPrincipal) {
            // this could happen if the user is logged in in SAML2 but not in DB... !
            DefaultSaml2AuthenticatedPrincipal ppal = (DefaultSaml2AuthenticatedPrincipal) auth.getPrincipal();
            Optional<User> user = userRepository.findUserByContactInfo(ppal.getName());
            User userExists = user.orElse(null);

            if (userExists == null) {
                SharepointUtils utils = new SharepointUtils();
                sharepoint.beans.igt.com.User sharepointUser = utils.getUserByEmail(ppal.getName());

                String[] name = sharepointUser.getDisplayName().split(", ");
                UserRequestModel userRequestModel = new UserRequestModel();
                userRequestModel.setContactInfo(ppal.getName());

                userRequestModel.setFname(name[1]);
                userRequestModel.setLname(name[0]);
                // newUser.setContactDate(new Date());
                addNewUser(userRequestModel);
            }

//            List<GrantedAuthority> authorities = new ArrayList<>();
//            SecurityContextHolder.getContext().getAuthentication().getAuthorities().clear();
//            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
//            if(user.get().getRole().getId() <= 3){
//                authorities.add(new SimpleGrantedAuthority("ROLE_ENGINEER"));
//            }
//            if(user.get().getRole().getId() <= 2){
//                authorities.add(new SimpleGrantedAuthority("ROLE_MANAGER"));
//            }
//            if(user.get().getRole().getId() <= 1){
//                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
//            }
//
//            Authentication a = new UsernamePasswordAuthenticationToken(user.get(), user.get().getPassword(), authorities);
//            SecurityContextHolder.getContext().setAuthentication(a);
//

            return userRepository.findUserByContactInfo(ppal.getName()).orElse(null);
        } else {
            return null;
        }
    }

    public List<String> suggestIGTEmails(String email) throws Exception{
        if(email.length() < 3){
            throw new IllegalArgumentException("at least 3 characters need to be provided to complete search");
        }
        List<sharepoint.beans.igt.com.User> users = sharepointUtils.getUsersByStartOfEmail(email);
        List<String> emails = new ArrayList<>();
        for(sharepoint.beans.igt.com.User u : users){
            emails.add(u.getEmail().toLowerCase());
        }
        return emails;
    }

    public User addNewUserFromEmail(String email, String role) throws Exception{
        Optional<User> existingUser = userRepository.findUserByContactInfo(email);
            if(existingUser.isPresent()){
                return existingUser.get();
            }
            sharepoint.beans.igt.com.User newUser = sharepointUtils.getUserByEmail(email);
            String[] names = newUser.getDisplayName().split(", ");
            UserRequestModel userRequestModel = new UserRequestModel();
            userRequestModel.setLname(names[0]);
            userRequestModel.setFname(names[1]);
            userRequestModel.setContactInfo(newUser.getEmail());
            userRequestModel.setContactDate("never");

            Optional<RoleModel> roleModelOptional = roleRepository.findRoleModelByRole(role);
            if(!roleModelOptional.isPresent()){
                throw new IllegalArgumentException("this role doesn't exist");
            }
            userRequestModel.setRole(roleModelOptional.get().getId());

            addNewUser(userRequestModel);

            return getUserByContactInfo(email);

    }


    @Scheduled(fixedRate = 86400000)
    public void scheduleTest(){
        List<User> users = userRepository.findAll();

        LocalDate date = LocalDate.now();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        String dateString = date.format(format);

        for(User user: users){
            if(!user.getContactDate().equals("never") && user.getContactDate().equals(dateString)){
                String message = "Hello %s, <br/>" +
                        "This is your scheduled reminder to make sure you check your projects and sites for updates and accuracy.<br>" +
                        "Thanks".format(user.getFname() + " " + user.getLname());

                EmailUtils.sendMessage(user.getContactInfo(), message, "Scheduled Reminder", mailProperties.getPort(), mailProperties.getHost());

                LocalDate nextReminder = LocalDate.now().plusDays(user.getContactPeriod());
                user.setContactDate(nextReminder.format(format));
                userRepository.save(user);

            }
        }
    }
}
