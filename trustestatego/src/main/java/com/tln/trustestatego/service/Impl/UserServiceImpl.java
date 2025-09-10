package com.tln.trustestatego.service.Impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.tln.trustestatego.dto.request.UserCreationRequest;
import com.tln.trustestatego.dto.request.UserUpdateRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.UserResponse;
import com.tln.trustestatego.entity.PropertyImage;
import com.tln.trustestatego.entity.Role;
import com.tln.trustestatego.entity.User;
import com.tln.trustestatego.entity.UserRole;
import com.tln.trustestatego.mapper.PageMapper;
import com.tln.trustestatego.mapper.UserMapper;
import com.tln.trustestatego.repository.RoleRepository;
import com.tln.trustestatego.repository.UserRepository;
import com.tln.trustestatego.repository.UserRoleRepository;
import com.tln.trustestatego.service.CurrentUserService;
import com.tln.trustestatego.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    UserRoleRepository userRoleRepository;
    Cloudinary cloudinary;
    PageMapper pageMapper;
    CurrentUserService currentUserService;

    public PageResponse<UserResponse> getUsers(String kw, Pageable pageable){
        if(kw != null && !kw.isEmpty()) {
            Page<UserResponse> userPage =  userRepository.findByUsernameContainingIgnoreCase(kw, pageable)
                    .map(userMapper::toUserResponse);
            return pageMapper.toPageResponse(userPage);
        }
        Page<UserResponse> userPage = userRepository.findAll(pageable)
                .map(userMapper::toUserResponse);
        return pageMapper.toPageResponse(userPage);
    }

    public UserResponse getUserById(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return userMapper.toUserResponse(user);
    }

    public UserResponse getCurrentUser() {
        User user = currentUserService.getCurrentUser();
        return userMapper.toUserResponse(user);
    }

    public UserResponse createUser(UserCreationRequest request) {
        // Check user đã tồn tại chưa
        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));

        User user;
        if (optionalUser.isEmpty()) {
            // User chưa tồn tại -> tạo mới
            user = userMapper.toUser(request);
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setAvatar(upload(request.getAvatar()));
            user.setCreatedAt(LocalDateTime.now());
            user = userRepository.save(user);

            UserRole userRole = new UserRole();
            userRole.setUser(user);
            userRole.setRole(role);
            userRoleRepository.save(userRole);

        } else {
            // User đã tồn tại
            user = optionalUser.get();

            boolean hasRole = userRoleRepository.existsByUserIdAndRoleId(user.getId(), request.getRoleId());
            if (hasRole) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User existed");
            }

            // Thêm role mới cho user
            UserRole userRole = new UserRole();
            userRole.setUser(user);
            userRole.setRole(role);
            userRoleRepository.save(userRole);
        }

        return getUserById(user.getId());
    }


//    public UserResponse createUser(UserCreationRequest userCreationRequest){
//        if(userRepository.existsByUsername(userCreationRequest.getUsername()))
//            throw new RuntimeException("Username existed");
//
//
//        User user = userMapper.toUser(userCreationRequest);
//        user.setPassword(passwordEncoder.encode(userCreationRequest.getPassword()));
//        user.setAvatar(upload(userCreationRequest.getAvatar()));
//        user.setCreatedAt(LocalDateTime.now());
//        user = userRepository.save(user);
//
//        Role role = roleRepository.findById(userCreationRequest.getRoleId())
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));
//
//        UserRole userRole = new UserRole();
//        userRole.setUser(user);
//        userRole.setRole(role);
//        userRoleRepository.save(userRole);
//
//        return getUserById(user.getId());
//    }

    public UserResponse updateUserFromAdmin(int userId, UserUpdateRequest userUpdateRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Map các field cơ bản
        userMapper.update(user, userUpdateRequest);

        // Cập nhật password nếu có
        if (userUpdateRequest.getPassword() != null && !userUpdateRequest.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userUpdateRequest.getPassword()));
        }

        // Cập nhật avatar nếu có
        String image = upload(userUpdateRequest.getAvatar());
        if (image != null) {
            user.setAvatar(image);
        }

        // Cập nhật roles nếu có truyền
        if (userUpdateRequest.getRoleId() != null && !userUpdateRequest.getRoleId().isEmpty()) {
            userRoleRepository.deleteByUserId(userId);

            // Gán role mới
            for (Integer roleId : userUpdateRequest.getRoleId()) {
                if (userUpdateRequest.getGender() != null) user.setGender(userUpdateRequest.getGender());
                if (userUpdateRequest.getBirthday() != null) user.setBirthday(userUpdateRequest.getBirthday());
                if (userUpdateRequest.getAvatar() != null && !userUpdateRequest.getAvatar().isEmpty()) {
                    user.setAvatar(upload(userUpdateRequest.getAvatar()));
                }
                Role role = roleRepository.findById(roleId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));

                UserRole userRole = new UserRole();
                userRole.setUser(user);
                userRole.setRole(role);
                userRoleRepository.save(userRole);
            }
        }

        user.setUpdatedAt(LocalDateTime.now());
        user = userRepository.save(user);

        return userMapper.toUserResponse(user);
    }

    public UserResponse updateUser(UserUpdateRequest userUpdateRequest) {
        User user = currentUserService.getCurrentUser();
        // Map các field cơ bản
        userMapper.update(user, userUpdateRequest);

        // Cập nhật password nếu có
        if (userUpdateRequest.getPassword() != null && !userUpdateRequest.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userUpdateRequest.getPassword()));
        }

        // Cập nhật avatar nếu có
        String image = upload(userUpdateRequest.getAvatar());
        if (image != null) {
            user.setAvatar(image);
        }

        // Cập nhật roles nếu có truyền
        if (userUpdateRequest.getRoleId() != null && !userUpdateRequest.getRoleId().isEmpty()) {
            userRoleRepository.deleteByUserId(user.getId());

            // Gán role mới
            for (Integer roleId : userUpdateRequest.getRoleId()) {
                if (userUpdateRequest.getGender() != null) user.setGender(userUpdateRequest.getGender());
                if (userUpdateRequest.getBirthday() != null) user.setBirthday(userUpdateRequest.getBirthday());
                if (userUpdateRequest.getAvatar() != null && !userUpdateRequest.getAvatar().isEmpty()) {
                    user.setAvatar(upload(userUpdateRequest.getAvatar()));
                }
                Role role = roleRepository.findById(roleId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));

                UserRole userRole = new UserRole();
                userRole.setUser(user);
                userRole.setRole(role);
                userRoleRepository.save(userRole);
            }
        }

        user.setUpdatedAt(LocalDateTime.now());
        user = userRepository.save(user);

        return userMapper.toUserResponse(user);
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
