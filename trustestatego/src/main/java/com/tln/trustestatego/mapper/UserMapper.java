package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.UserCreationRequest;
import com.tln.trustestatego.dto.request.UserUpdateRequest;
import com.tln.trustestatego.dto.response.UserResponse;
import com.tln.trustestatego.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "avatar",ignore = true)
    User toUser(UserCreationRequest userCreationRequest);
    UserResponse toUserResponse(User user);
    @Mapping(target = "avatar",ignore = true)
    void update(@MappingTarget User user, UserUpdateRequest userUpdateRequest);
}
