package com.lootopia.server.mapper;

import com.lootopia.server.dto.UserDto;
import com.lootopia.server.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    UserDto toDTO(User user);

    List<UserDto> toDTOs(List<User> users);

    User toEntity(UserDto userDto);

    List<User> toEntities(List<UserDto> userDtos);
}
