package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.request.PropertySaveRequest;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.dto.response.PropertySaveResponse;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.entity.PropertySave;
import com.tln.trustestatego.entity.User;
import com.tln.trustestatego.mapper.PropertyMapper;
import com.tln.trustestatego.mapper.PropertySaveMapper;
import com.tln.trustestatego.repository.PropertyRepository;
import com.tln.trustestatego.repository.PropertySaveRepository;
import com.tln.trustestatego.repository.UserRepository;
import com.tln.trustestatego.service.CurrentUserService;
import com.tln.trustestatego.service.PropertySaveService;
import com.tln.trustestatego.service.PropertyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PropertySaveServiceImpl implements PropertySaveService {
    PropertySaveMapper propertySaveMapper;
    PropertySaveRepository propertySaveRepository;
    UserRepository userRepository;
    PropertyRepository propertyRepository;
    CurrentUserService currentUserService;

    @Override
    public List<PropertySaveResponse> getPropertySaveByUserId() {
        User user = currentUserService.getCurrentUser();
        return propertySaveRepository.findByUser_Id(user.getId())
                .stream()
                .map(propertySaveMapper::toPropertySaveResponse)
                .collect(Collectors.toList());
    }

    @Override
    public boolean togglePropertySave(int propertyId) {
        User user = currentUserService.getCurrentUser();
        Optional<PropertySave> existingSave = propertySaveRepository.findByUser_IdAndProperty_Id(user.getId(), propertyId);

        if (existingSave.isPresent()) {
            propertySaveRepository.delete(existingSave.get());
            return false; // đã bỏ lưu
        } else {
            PropertySave save = new PropertySave();
            save.setUser(userRepository.findById(user.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")));
            save.setProperty(propertyRepository.findById(propertyId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Property not found")));
            propertySaveRepository.save(save);
            return true; // đã lưu
        }
    }


    @Override
    public void deleteById(int proSaveId) {
        propertySaveRepository.deleteById(proSaveId);
    }
}
