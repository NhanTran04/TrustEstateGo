package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.UserCreationRequest;
import com.tln.trustestatego.dto.request.UserUpdateRequest;
import com.tln.trustestatego.dto.response.UserResponse;
import com.tln.trustestatego.entity.Role;
import com.tln.trustestatego.entity.User;
import com.tln.trustestatego.entity.UserRole;
import com.tln.trustestatego.mapper.UserMapper;
import com.tln.trustestatego.repository.RoleRepository;
import com.tln.trustestatego.repository.UserRepository;
import com.tln.trustestatego.repository.UserRoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    UserRoleRepository userRoleRepository;

    public List<UserResponse> getUsers(){
        return userRepository.findAll()
                .stream()
                .map(user -> userMapper.toUserResponse(user))
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userMapper.toUserResponse(user);
    }

    public UserResponse createUser(UserCreationRequest request){
        if(userRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("Username existed");


        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user = userRepository.save(user);

        Role role = roleRepository.findById(request.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        userRoleRepository.save(userRole);

        return getUserById(user.getId());


    }

//    public UserResponse updateUser(String userId, UserUpdateRequest userUpdateRequest){
//        User user = userMapper.toUserFromUserResponse(getUserById(userId));
//        userMapper.updateUser(user, request);
//
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//
//        var roles = roleRepository.findAllById(request.getRoles());
//        user.setRoles(new HashSet<>(roles));
//
//        return userMapper.toUserResponse(userRepository.save(user));
//    }


}
