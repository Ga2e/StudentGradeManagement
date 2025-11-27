package org.ga2e.project.module.Captcha.service.imp;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.time.Duration;

import javax.imageio.ImageIO;

import org.ga2e.project.common.constant.BizCodeEnum;
import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Captcha.dto.VerifyDTO;
import org.ga2e.project.module.Captcha.service.CaptchaService;
import org.springframework.data.redis.core.BoundValueOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.google.code.kaptcha.Producer;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CaptchaServiceImp implements CaptchaService {

  private final Producer kaptcha;

  private final RedisTemplate redisTemplate;

  @Override
  public void generateCaptcha(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
      throws IOException {
    // http header field
    httpServletResponse.setDateHeader("Expires", 0);
    httpServletResponse.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    httpServletResponse.addHeader("Cache-Control", "post-check=0, pre-check=0");
    httpServletResponse.setHeader("Pragma", "no-cache");
    httpServletResponse.setContentType("image/jpeg");
    String captchaKey = generateCaptchaKey(httpServletRequest);

    String captchaText = kaptcha.createText();
    log.info("captcha text: " + captchaText);
    BoundValueOperations ops = redisTemplate.boundValueOps("verify:code:" + captchaKey);
    ops.set(captchaText, Duration.ofMinutes(5));
    httpServletResponse.setHeader("X-Captcha-Key", captchaKey);
    BufferedImage image = kaptcha.createImage(captchaText);
    ServletOutputStream outputStream = httpServletResponse.getOutputStream();
    ImageIO.write(image, "jpg", outputStream);

    try {
      outputStream.flush();
    } catch (Exception e) {
      outputStream.close();
    }

    return;

  }

  @Override
  public ApiResult<?> verifyCapthca(VerifyDTO verifyCaptchaDTO) {
    System.out.println(verifyCaptchaDTO.getCaptchaKey());
    BoundValueOperations ops = redisTemplate.boundValueOps("verify:code:" + verifyCaptchaDTO.getCaptchaKey());
    String code = (String) ops.get();
    if (!code.equalsIgnoreCase(verifyCaptchaDTO.getCaptchaCode())) {
      return ApiResult.fail(BizCodeEnum.CAPTCHANOTMATCH);
    }
    return ApiResult.success();

  }

  private String generateCaptchaKey(HttpServletRequest request) {
    // 可以使用 sessionId + 时间戳
    String sessionId = request.getSession().getId();
    return sessionId + "_" + System.currentTimeMillis();
  }

}
