package org.ga2e.project.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BizException extends RuntimeException {
  private int code;
  private String message;

}
