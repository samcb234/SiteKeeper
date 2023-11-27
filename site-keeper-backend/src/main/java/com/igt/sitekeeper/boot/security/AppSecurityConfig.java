package com.igt.sitekeeper.boot.security;

import com.igt.sitekeeper.boot.service.UserService;
import com.igt.sitekeeper.boot.utils.SharepointUtils;
import com.igt.sitekeeper.requestmodel.UserRequestModel;
import org.opensaml.saml.saml2.core.Assertion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.saml2.provider.service.authentication.DefaultSaml2AuthenticatedPrincipal;
import org.springframework.security.saml2.provider.service.authentication.OpenSamlAuthenticationProvider;
import org.springframework.security.saml2.provider.service.authentication.Saml2Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;

@Configuration
@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true, proxyTargetClass = true)
@PropertySource("classpath:application.properties")
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {
  static Logger logger = LoggerFactory.getLogger(AppSecurityConfig.class);
  @Autowired
  private CommenceEntryPoint unauthorizedHandler;

  @Autowired
  private UserService userService;

  public UserDetailsService inMemoryUserDetailsManager() {
    // The builder will ensure the passwords are encoded before saving in memory
    User.UserBuilder users = User.withDefaultPasswordEncoder();
    List<com.igt.sitekeeper.model.User> usersInDB = userService.getAllUsers();

    logger.error("Loading user data for SAML2");

    List<UserDetails> userDetails = new ArrayList<>();
    // here we need to add all users from the DB
    for(com.igt.sitekeeper.model.User u : usersInDB){
      List<String> rolesList = new ArrayList<>();
      rolesList.add("ROLE_USER");

      if(u.getRole().getRole().equals("engineer")){
        rolesList.add("ROLE_ENGINEER");
      }else if(u.getRole().getRole().equals("manager")){
        rolesList.add("ROLE_MANAGER");
        rolesList.add("ROLE_ENGINEER");
      } else if(u.getRole().getRole().equals("admin")){
        rolesList.add("ROLE_ADMIN");
        rolesList.add("ROLE_MANAGER");
        rolesList.add("ROLE_ENGINEER");
      }


      UserDetails user = users
              .username(u.getContactInfo())
              .password("password1234")
              .authorities(rolesList.toArray(new String[rolesList.size()]))
              .build();

      userDetails.add(user);
    }

    return new InMemoryUserDetailsManager(userDetails);
  }

  private Saml2Authentication createAuth(String userName, Saml2Authentication oldAuth) {
    logger.error("Creatin SAML2 Auth");
    //get user details
    UserDetails userDetails = inMemoryUserDetailsManager().loadUserByUsername(userName);
    //create principal attributes / data
    Map<String, List<Object>> principalAttributes = new HashMap<>();

    //create list of objects required by principal attributes
    List<Object> userDataList = new ArrayList<>();

    // bring user from DB and add it to list
    com.igt.sitekeeper.model.User userDb = userService.getUserByContactInfo(userName);
    userDataList.add(userDb);
    principalAttributes.put("user", userDataList);

    //Create principal and new auth!
    DefaultSaml2AuthenticatedPrincipal principal = new DefaultSaml2AuthenticatedPrincipal(userName, principalAttributes);
    Saml2Authentication authentication = new Saml2Authentication(principal, oldAuth.getSaml2Response(), userDetails.getAuthorities());
    authentication.setDetails(userDetails);

    // after this you should be able to get users in the app using Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    return authentication;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    OpenSamlAuthenticationProvider authenticationProvider = new OpenSamlAuthenticationProvider();
    authenticationProvider.setResponseAuthenticationConverter(responseToken -> {
      logger.error("Attempting SAML2 auth");

      Saml2Authentication authentication = OpenSamlAuthenticationProvider
              .createDefaultResponseAuthenticationConverter()
              .convert(responseToken);

      Assertion assertion = responseToken.getResponse().getAssertions().get(0);
      String username = assertion.getSubject().getNameID().getValue();

      try {
        logger.error("User {} attempting login using SSON", username);
        return createAuth(username, authentication);
      } catch(UsernameNotFoundException ex){
        logger.error("User {} doesn't exists locally, attempting creation.", username);

        // since it doesnt exists, add user to DB HERE, then retry the auth creation
        SharepointUtils utils = new SharepointUtils();
        sharepoint.beans.igt.com.User sharepointUser = utils.getUserByEmail(username);
        UserRequestModel userRequestModel = new UserRequestModel();
        userRequestModel.setContactInfo(username);
        try{
          String[] name = sharepointUser.getDisplayName().split(", ");
          userRequestModel.setFname(name[1]);
          userRequestModel.setLname(name[0]);
        } catch (Exception e){
          userRequestModel.setFname("");
          userRequestModel.setLname("");
        }
        try {
          userService.addNewUser(userRequestModel);
        } catch (Exception e){
          e.printStackTrace();
        }

        return createAuth(username, authentication);
      } catch(Exception ex) {
        logger.error(ex.getMessage());
        ex.printStackTrace();
      }

      return null;
    });

    http
        .authorizeRequests(authorize -> authorize.antMatchers("/","/home", "/error", "/search", "/view/**", // direct access from anonymous users here
                "/api/**", "/api/auth/**", "/oauth2/**", "/index.html", "/*.js", "/*.png", "/*.js.map",
                        "/*.css", "/static/js/**", "/static/**", "/static/css/**", "/assets/img/*.png",
                        "**/favicon.ico", "/manifest.json", "/topic/**", "/sk-websocket/**", "/project/**","/site/**",
                        "/createProject/**")
            .permitAll()
            .anyRequest().authenticated())
        .csrf().disable()
            .saml2Login(saml2 -> saml2
            .authenticationManager(new ProviderManager(authenticationProvider)
            )
        );
  }
}