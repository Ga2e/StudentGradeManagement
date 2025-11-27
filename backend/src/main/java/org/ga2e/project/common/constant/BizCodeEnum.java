package org.ga2e.project.common.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum BizCodeEnum {

  SUCCESS(200, "success"),
  FAILD(10000, "operated faild"),
  PARAM_ERROR(10001, "param error"),
  // common
  UNAUTHORIZED(10002, "please login"),
  FORBIDDEN(10003, "no permission"),
  USER_NOT_FOUND(10004, "user not found"),
  // captcha
  CAPTCHAEXPIRED(90001, "captcha has been expired"),
  CAPTCHANOTMATCH(90002, "captcha dont match try again");

  private final int code;
  private final String message;
}
