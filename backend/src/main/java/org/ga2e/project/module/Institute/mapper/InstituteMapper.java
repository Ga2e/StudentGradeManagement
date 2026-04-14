package org.ga2e.project.module.Institute.mapper;

import java.util.List;

import org.ga2e.project.module.Institute.dto.InstituteAddDTO;
import org.ga2e.project.module.Institute.dto.InstituteUpdateDTO;
import org.ga2e.project.module.Institute.entity.Institute;
import org.ga2e.project.module.Institute.mapper.decorator.InstituteDecorator;
import org.ga2e.project.module.Institute.resp.InstituteResp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", uses = InstituteDecorator.class)
public interface InstituteMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "professionals", ignore = true)

  public Institute AddToEntity(InstituteAddDTO instituteAddDTO);

  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "professionals", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)

  public Institute UpdateToEntity(InstituteUpdateDTO instituteUpdateDTO);

  public List<Institute> listAddDTOToEntitys(List<InstituteAddDTO> instituteAddDTOs);

  public InstituteResp entityToResp(Institute institute);

  public List<InstituteResp> entitysToResps(List<Institute> institutes);

  default Page<InstituteResp> entitysToResps(Page<Institute> iPage) {
    return iPage.map(this::entityToResp);
  };

}
