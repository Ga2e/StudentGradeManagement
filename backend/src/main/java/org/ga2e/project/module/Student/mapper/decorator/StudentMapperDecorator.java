package org.ga2e.project.module.Student.mapper.decorator;

import org.ga2e.project.module.Student.resp.StudentProfileResp;
import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.mapper.UserMapper;
import org.ga2e.project.module.User.resp.StudentResp;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StudentMapperDecorator {
  private UserMapper userMapper;

}
