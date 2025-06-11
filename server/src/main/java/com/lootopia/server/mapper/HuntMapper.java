package com.lootopia.server.mapper;

import com.lootopia.server.dto.HuntDto;
import com.lootopia.server.entity.Hunt;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HuntMapper {
  HuntDto toDTO(Hunt hunt);

  List<HuntDto> toDTOs(List<Hunt> hunts);

  Hunt toEntity(HuntDto huntDto);

  List<Hunt> toEntities(List<HuntDto> huntDtos);
}
