package org.ga2e.project.common.utils;

import jakarta.servlet.http.HttpServletRequest;

public class IpUtil {

  public static String getClientIp(HttpServletRequest request) {
    String[] headers = {
        "X-Forwarded-For",
        "X-Real-IP",
        "Proxy-Client-IP",
        "WL-Proxy-Client-IP",
        "HTTP_CLIENT_IP",
        "HTTP_X_FORWARDED_FOR"
    };

    for (String header : headers) {
      String ip = request.getHeader(header);
      if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
        // X-Forwarded-For 可能多个，取第一个
        return ip.split(",")[0].trim();
      }
    }
    // 都拿不到，最后兜底
    return request.getRemoteAddr();
  }
}
