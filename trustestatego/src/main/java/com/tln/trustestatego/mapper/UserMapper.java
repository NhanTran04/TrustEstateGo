package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.UserCreationRequest;
import com.tln.trustestatego.dto.request.UserUpdateRequest;
import com.tln.trustestatego.dto.response.RoleResponse;
import com.tln.trustestatego.dto.response.UserResponse;
import com.tln.trustestatego.entity.Role;
import com.tln.trustestatego.entity.User;
import com.tln.trustestatego.entity.UserRole;
import org.mapstruct.*;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "avatar",ignore = true)
    User toUser(UserCreationRequest userCreationRequest);
    @Mapping(target = "roles", expression = "java(mapRoles(user.getUserRoles()))")
    UserResponse toUserResponse(User user);
    @Mapping(target = "avatar",ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget User user, UserUpdateRequest userUpdateRequest);

    RoleResponse toRoleResponse(Role role);
    default Set<RoleResponse> mapRoles(Set<UserRole> userRoles){
        if(userRoles == null)
            return null;
        return userRoles.stream()
                .map(UserRole::getRole)
                .map(this::toRoleResponse)
                .collect(Collectors.toSet());
    }
}
