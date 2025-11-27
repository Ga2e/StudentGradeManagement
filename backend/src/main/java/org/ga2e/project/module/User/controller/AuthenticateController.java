package org.ga2e.project.module.User.controller;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.User.dto.LoginDTO;
import org.ga2e.project.module.User.mapper.UserMapper;
import org.ga2e.project.module.User.repo.UserRepo;
import org.ga2e.project.module.User.service.AuthenticateService;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j
public class AuthenticateController {
  private final AuthenticateService authenticateService;

  @PostMapping("/login")
  public ApiResult<?> login(LoginDTO loginDTO) {
    return authenticateService.login(loginDTO);
  }

  @PostMapping("/logout")
  public ApiResult<?> logout(HttpServletRequest request) {
    return authenticateService.logout(request);
  }
}
