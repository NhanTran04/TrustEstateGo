package com.tln.trustestatego.service.Impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.tln.trustestatego.dto.request.UserCreationRequest;
import com.tln.trustestatego.dto.request.UserUpdateRequest;
import com.tln.trustestatego.dto.response.UserResponse;
import com.tln.trustestatego.entity.PropertyImage;
import com.tln.trustestatego.entity.Role;
import com.tln.trustestatego.entity.User;
import com.tln.trustestatego.entity.UserRole;
import com.tln.trustestatego.mapper.UserMapper;
import com.tln.trustestatego.repository.RoleRepository;
import com.tln.trustestatego.repository.UserRepository;
import com.tln.trustestatego.repository.UserRoleRepository;
import com.tln.trustestatego.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    UserRoleRepository userRoleRepository;
    Cloudinary cloudinary;

    public List<UserResponse> getUsers(){
        return userRepository.findAll()
                .stream()
                .map(user -> userMapper.toUserResponse(user))
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userMapper.toUserResponse(user);
    }

    public UserResponse createUser(UserCreationRequest userCreationRequest){
        if(userRepository.existsByUsername(userCreationRequest.getUsername()))
            throw new RuntimeException("Username existed");


        User user = userMapper.toUser(userCreationRequest);
        user.setPassword(passwordEncoder.encode(userCreationRequest.getPassword()));
        user.setAvatar(upload(userCreationRequest.getAvatar()));
        user = userRepository.save(user);

        Role role = roleRepository.findById(userCreationRequest.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        userRoleRepository.save(userRole);

        return getUserById(user.getId());
    }

    public UserResponse updateUser(int userId, UserUpdateRequest userUpdateRequest){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.update(user, userUpdateRequest);

        if(userUpdateRequest.getPassword() != null && !userUpdateRequest.getPassword().isBlank())
            user.setPassword(passwordEncoder.encode(userUpdateRequest.getPassword()));
        String image = upload(userUpdateRequest.getAvatar());
        if(image != null)
            user.setAvatar(image);

        if (userUpdateRequest.getRole() > 0) {
            Role role = roleRepository.findById(userUpdateRequest.getRole())
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            boolean hasRole = userRoleRepository.existsByUserIdAndRoleId(userId, userUpdateRequest.getRole());
            if(!hasRole){
                UserRole userRole = new UserRole();
                userRole.setUser(user);
                userRole.setRole(role);
                userRoleRepository.save(userRole);
            }
        }

        return userMapper.toUserResponse(userRepository.save(user));
    }

    private String upload(MultipartFile file){
        if (file != null && !file.isEmpty()) {
            try {
                Map res = cloudinary.uploader().upload(file.getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                return res.get("secure_url").toString();
            } catch (Exception ex) {
                throw new RuntimeException("Error uploading image: " + file.getOriginalFilename(), ex);
            }
        }
        return null;
    }

    public void deleteUser(int userId){
        userRepository.deleteById(userId);
    }


}
