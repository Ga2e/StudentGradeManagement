// TermController.java
package org.ga2e.project.module.Term.controller;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Term.resp.TermResp;
import org.ga2e.project.module.Term.service.TermService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Sort;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/term")
@RequiredArgsConstructor
public class TermController {

  private final TermService termService;

  /**
   * 获取所有学期（不分页，用于下拉选）
   */
  @GetMapping
  public ApiResult<List<TermResp>> getAllTerm() {
    return termService.getAll();
  }

  /**
   * 根据ID查询学期详情
   */
  @GetMapping("/{id}")
  public ApiResult<TermResp> getById(@PathVariable Long id) {
    return termService.getById(id);
  }

  /**
   * 分页查询学期（可选，如果学期数据不多可不提供）
   */
  @GetMapping("/page")
  public ApiResult<Page<TermResp>> pageQuery(
      @PageableDefault(size = 10, page = 1, sort = "startDate", direction = Sort.Direction.DESC) Pageable pageable) {
    return termService.pageQuery(pageable);
  }
}
