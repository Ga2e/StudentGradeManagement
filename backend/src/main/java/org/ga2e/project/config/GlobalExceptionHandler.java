package org.ga2e.project.config;

import org.ga2e.project.common.response.ApiResult;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(exception = DataIntegrityViolationException.class)
  public ApiResult<?> dataIntegrity() {
    return ApiResult.fail(500, "数据被引用，无法删除");
  }
}
