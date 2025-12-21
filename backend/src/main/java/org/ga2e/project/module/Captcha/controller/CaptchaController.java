package org.ga2e.project.module.Captcha.controller;

import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Captcha.dto.VerifyDTO;
import org.ga2e.project.module.Captcha.service.CaptchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController

@RequestMapping("/api/captcha")
public class CaptchaController {

  @Autowired
  private CaptchaService captchaService;

  @GetMapping("/image")
  @Operation(summary = "get captcher")
  public void generateImage(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
      throws Exception {

    captchaService.generateCaptcha(httpServletRequest, httpServletResponse);
  }

  @PostMapping("/verify")
  public ApiResult<?> verifyCaptcha(@RequestBody @Valid VerifyDTO verifyDTO) throws Exception {
    return captchaService.verifyCapthca(verifyDTO);
  }

}
