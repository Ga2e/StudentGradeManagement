package org.ga2e.project.module.Term.service.imp;

import java.util.List;

import org.ga2e.project.common.exception.BizException;
import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Term.entity.Term;
import org.ga2e.project.module.Term.mapper.TermMapper;
import org.ga2e.project.module.Term.repo.TermRepo;
import org.ga2e.project.module.Term.resp.TermResp;
import org.ga2e.project.module.Term.service.TermService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TermServiceImp implements TermService {
  private final TermRepo termRepository;
  private final TermMapper termMapper;

  /**
   * 获取所有学期（不分页，用于下拉选）
   */
  @Override
  public ApiResult<List<TermResp>> getAll() {
    List<Term> terms = termRepository.findAll(
        Sort.by(Sort.Direction.DESC, "startDate"));
    return ApiResult.success(termMapper.toRespList(terms));
  }

  /**
   * 根据ID查询学期详情
   */
  @Override
  public ApiResult<TermResp> getById(Long id) {
    Term term = termRepository.findById(id)
        .orElseThrow(() -> new BizException(1, "学期不存在"));
    return ApiResult.success(termMapper.toResp(term));
  }

  /**
   * 分页查询学期
   */
  @Override
  public ApiResult<Page<TermResp>> pageQuery(Pageable pageable) {
    Page<Term> page = termRepository.findAll(pageable);
    Page<TermResp> entitysToResps = termMapper.toRespList(page);

    return ApiResult.success(entitysToResps);
  }
}
