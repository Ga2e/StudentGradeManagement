package org.ga2e.project.module.Captcha.service;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Captcha.dto.VerifyDTO;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public interface CaptchaService {
  public void generateCaptcha(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
      throws Exception;

  public ApiResult<?> verifyCapthca(VerifyDTO verifyDTO) throws Exception;
}
