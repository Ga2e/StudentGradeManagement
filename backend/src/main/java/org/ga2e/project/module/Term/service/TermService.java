package org.ga2e.project.module.Term.service;

import java.util.List;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Term.resp.TermResp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface TermService {

  public ApiResult<List<TermResp>> getAll();

  public ApiResult<TermResp> getById(Long id);

  public ApiResult<Page<TermResp>> pageQuery(Pageable pageable);

}
