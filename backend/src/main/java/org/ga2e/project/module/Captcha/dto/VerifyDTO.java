package org.ga2e.project.module.Captcha.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerifyDTO {

  @NotBlank
  private String captchaCode;
  @NotBlank
  private String captchaKey;
}
