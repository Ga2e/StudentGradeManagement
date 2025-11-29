package org.ga2e.project.module.User.controller;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.User.dto.LoginDTO;
import org.ga2e.project.module.User.service.AuthenticateService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j
public class AuthenticateController {
  private final AuthenticateService authenticateService;

  @PostMapping("/login")
  public ApiResult<?> login(@RequestBody LoginDTO loginDTO) {
    return authenticateService.login(loginDTO);
  }

  @PostMapping("/logout")
  public ApiResult<?> logout(@RequestBody HttpServletRequest request) {
    return authenticateService.logout(request);
  }
}
