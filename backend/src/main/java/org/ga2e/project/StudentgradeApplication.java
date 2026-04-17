package org.ga2e.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(info = @Info(title = "Student grade management API", version = "v1.0.0"))
@SpringBootApplication
public class StudentgradeApplication {

  public static void main(String[] args) {
    SpringApplication.run(StudentgradeApplication.class, args);

  }

}
