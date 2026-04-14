package org.ga2e.project.module.ElectiveCourse.service;

import java.util.List;

import org.ga2e.project.module.ElectiveCourse.dto.ElectiveCourseAddDTO;
import org.ga2e.project.module.ElectiveCourse.resp.ElectiveCourseResp;

public interface ElectiveCourseService {

  void add(ElectiveCourseAddDTO electiveCourseAddDTO, Long userId);

  void delete(Long id, Long userId);

  List<ElectiveCourseResp> findByUserId(Long userId);

  List<ElectiveCourseResp> findByUserIdAndTermId(Long userId, Long termId);

}
