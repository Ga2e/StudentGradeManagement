
package org.ga2e.project.module.Student.controller;

import org.springframework.stereotype.Service;

@Service
public interface StudentController {

  void addStudent();

  void batchAdd();

  void findById();

  void pageQuery();

  void deleteStudent();

  void updateStudent();

}
