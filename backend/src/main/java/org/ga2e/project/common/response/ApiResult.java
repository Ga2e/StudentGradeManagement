package org.ga2e.project.common.response;

import java.io.Serializable;

import org.ga2e.project.common.constant.BizCodeEnum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResult<T> implements Serializable {
  private int code;
  private String message;
  private T data;
  private String traceId;
  private long timestamp;

  public static <T> ApiResult<T> success(T data) {

    return ApiResult.<T>builder()
        .code(200)
        .message("OK")
        .data(data)
        .timestamp(System.currentTimeMillis())
        .traceId("") // MDC 获取
        .build();
  }

  public static <T> ApiResult<T> success() {
    return success(null);
  }

  public static <T> ApiResult<T> fail(int code, String message) {
    return ApiResult.<T>builder()
        .code(code)
        .message(message)
        .timestamp(System.currentTimeMillis())
        .traceId("")
        .build();
  }

  public static <T> ApiResult<T> fail(BizCodeEnum bizcode) {
    return ApiResult.<T>builder()
        .code(bizcode.getCode())
        .message(bizcode.getMessage())
        .timestamp(System.currentTimeMillis())
        .traceId("")
        .build();
  }

  public static <T> ApiResult<T> error(String message) {
    return fail(500, message);
  }
}
