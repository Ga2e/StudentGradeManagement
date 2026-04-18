package org.ga2e.project.module.Class.mapper;

import java.util.List;

import org.ga2e.project.module.Class.dto.ClassAddDTO;
import org.ga2e.project.module.Class.dto.ClassUpdateDTO;
import org.ga2e.project.module.Class.entity.Class;
import org.ga2e.project.module.Class.mapper.decorator.ClassDecorator;
import org.ga2e.project.module.Class.resp.ClassResp;
import org.ga2e.project.module.Professional.mapper.GradePlanMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", uses = { ClassDecorator.class, GradePlanMapper.class })
public interface ClassMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "gradePlan", source = "gradePlanId")

  public Class AddToEntity(ClassAddDTO classAddDTO);

  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "gradePlan", source = "gradePlanId")
  public Class UpdateToEntity(ClassUpdateDTO classUpdateDTO);

  public List<Class> listAddDTOToEntitys(List<ClassAddDTO> classAddDTOs);

  @Mapping(target = "gradePlan", source = "gradePlan")
  public ClassResp entityToResp(Class clazz);

  public List<ClassResp> entitysToResps(List<Class> classs);

  default Page<ClassResp> entitysToResps(Page<Class> iPage) {
    return iPage.map(this::entityToResp);
  };

}
