package com.igt.sitekeeper.boot.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

@Component
public class CommenceEntryPoint implements AuthenticationEntryPoint, Serializable {
  private static final long serialVersionUID = 565662170056829238L;
  static Logger logger = LoggerFactory.getLogger(CommenceEntryPoint.class);

  // invoked when user tries to access a secured REST resource without supplying any credentials,
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
    // send a json object, with http code 401,
    // response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");

    // redirect to login page, for non-ajax request,
    logger.error("commence error trying to access unauth resource!");
    response.sendRedirect("/");
  }
}