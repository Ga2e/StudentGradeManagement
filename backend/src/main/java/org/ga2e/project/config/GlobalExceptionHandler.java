package org.ga2e.project.config;

import org.ga2e.project.common.response.ApiResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(RuntimeException.class)
  public ApiResult<?> globalExceptionHandler(RuntimeException runtimeException) {

    return ApiResult.error(runtimeException.getMessage());
  }
}
