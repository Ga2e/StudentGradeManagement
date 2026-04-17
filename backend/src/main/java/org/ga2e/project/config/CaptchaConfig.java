package org.ga2e.project.config;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.code.kaptcha.Producer;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;

@Configuration
public class CaptchaConfig {

  @Bean
  Producer kaptchaProduce() {
    Properties properties = new Properties();
    // 图片宽度
    properties.setProperty("kaptcha.image.width", "100");
    // 图片高度
    properties.setProperty("kaptcha.image.height", "40");
    // 字体大小
    properties.setProperty("kaptcha.textproducer.font.size", "32");
    // 字体颜色
    properties.setProperty("kaptcha.textproducer.font.color", "0,0,0");
    // 字符范围
    properties.setProperty("kaptcha.textproducer.char.string", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    DefaultKaptcha defaultKaptcha = new DefaultKaptcha();
    Config config = new Config(properties);
    defaultKaptcha.setConfig(config);
    return defaultKaptcha;

  }

}
