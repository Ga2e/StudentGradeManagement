// TermMapper.java
package org.ga2e.project.module.Term.mapper;

import org.ga2e.project.module.Term.entity.Term;
import org.ga2e.project.module.Term.resp.TermResp;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TermMapper {

  TermMapper INSTANCE = Mappers.getMapper(TermMapper.class);

  /**
   * Entity → Resp
   */
  TermResp toResp(Term term);

  /**
   * 批量转换
   */
  List<TermResp> toRespList(List<Term> terms);

  default Page<TermResp> toRespList(Page<Term> terms) {
    return terms
        .map(this::toResp);
  }
}
