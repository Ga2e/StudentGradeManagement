package org.ga2e.project.module.Professional.mapper;

import java.util.List;

import org.ga2e.project.module.Institute.mapper.decorator.InstituteDecorator;
import org.ga2e.project.module.Professional.dto.ProfessionalAddDTO;
import org.ga2e.project.module.Professional.dto.ProfessionalUpdateDTO;
import org.ga2e.project.module.Professional.entity.Professional;
import org.ga2e.project.module.Professional.mapper.decorator.ProfessionalDecorator;
import org.ga2e.project.module.Professional.resp.ProfessionalResp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", uses = { ProfessionalDecorator.class, InstituteDecorator.class })
public interface ProfessionalMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "classes", ignore = true)
  @Mapping(target = "institute", source = "instituteId")
  public Professional AddToEntity(ProfessionalAddDTO professionalAddDTO);

  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "classes", ignore = true)
  @Mapping(target = "institute", source = "instituteId")
  @Mapping(target = "updatedAt", ignore = true)

  public Professional UpdateToEntity(ProfessionalUpdateDTO professionalUpdateDTO);

  public List<Professional> listAddDTOToEntitys(List<ProfessionalAddDTO> ProfessionalAddDTOs);

  @Mapping(target = "institute", source = "institute")
  public ProfessionalResp entityToResp(Professional professional);

  public List<ProfessionalResp> entitysToResps(List<Professional> professionals);

  default Page<ProfessionalResp> entitysToResps(Page<Professional> page) {
    return page.map(this::entityToResp);
  };

}
