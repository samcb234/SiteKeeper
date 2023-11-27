package com.igt.sitekeeper.boot.controller;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.saml2.provider.service.authentication.Saml2Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class AppController {
  @GetMapping(value = "/home")
  public String home() {
    return "index.html";
  }

  @GetMapping(value = "/")
  public String home1() {
    return "index.html";
  }

  @GetMapping(value = "/error")
  public String error() {
    return "error.html";
  }

  @GetMapping(value = {  "site/{id}", "project/{id}" })
  public String forAnonymous() {
    return "/index.html";
  }

  @GetMapping(value = "/featureStatistics")
  public String featureStatistics(){return "/index.html";}

  @GetMapping(value = "/sson")
  public String sson(HttpServletResponse httpServletResponse) {
    httpServletResponse.setHeader("Location", "/");
    httpServletResponse.setStatus(302);

    return null;
  }

  @GetMapping("/clogout")
  public void logout(HttpSession session, HttpServletResponse httpServletResponse){
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    if(auth instanceof UsernamePasswordAuthenticationToken) {
      ((UsernamePasswordAuthenticationToken) auth).eraseCredentials();
      session.invalidate();
    } else if(auth instanceof Saml2Authentication) {
      ((Saml2Authentication) auth).eraseCredentials();
      session.invalidate();
    }

    SecurityContextHolder.getContext().setAuthentication(null);
    httpServletResponse.setHeader("Location", "/");
    httpServletResponse.setStatus(302);
  }
}
