package com.lootopia.server.mapper;

import com.lootopia.server.dto.UserDto;
import com.lootopia.server.entity.User;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
  UserDto toDTO(User user);

  List<UserDto> toDTOs(List<User> users);

  User toEntity(UserDto userDto);

  List<User> toEntities(List<UserDto> userDtos);
}
