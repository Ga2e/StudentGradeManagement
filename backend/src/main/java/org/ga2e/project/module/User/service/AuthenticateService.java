package org.ga2e.project.module.User.service;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.User.dto.LoginDTO;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;

@Service
public interface AuthenticateService {

  public ApiResult<?> login(LoginDTO logindto);

  public ApiResult<?> logout(HttpServletRequest request);

}
