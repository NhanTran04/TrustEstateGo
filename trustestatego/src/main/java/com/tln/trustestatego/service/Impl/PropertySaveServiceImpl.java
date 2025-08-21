package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.request.PropertySaveRequest;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.dto.response.PropertySaveResponse;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.entity.PropertySave;
import com.tln.trustestatego.mapper.PropertyMapper;
import com.tln.trustestatego.mapper.PropertySaveMapper;
import com.tln.trustestatego.repository.PropertyRepository;
import com.tln.trustestatego.repository.PropertySaveRepository;
import com.tln.trustestatego.repository.UserRepository;
import com.tln.trustestatego.service.PropertySaveService;
import com.tln.trustestatego.service.PropertyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


    @Override
    public List<PropertySaveResponse> getPropertyByUserId(int userId) {
        return propertySaveRepository.findByUserId(userId)
                .stream()
                .map(propertySaveMapper::toPropertySaveResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void createProperty(PropertySaveRequest propertySaveRequest) {
        Optional<PropertySave> existingSave = propertySaveRepository
                .findByUserIdAndPropertyId(propertySaveRequest.getUserId(), propertySaveRequest.getPropertyId());

        if (existingSave.isPresent()) {
            propertySaveRepository.delete(existingSave.get());
        } else {
            PropertySave save = new PropertySave();
            save.setUser(userRepository.findById(propertySaveRequest.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found")));
            save.setProperty(propertyRepository.findById(propertySaveRequest.getPropertyId())
                    .orElseThrow(() -> new RuntimeException("Property not found")));
            propertySaveRepository.save(save);
        }
    }


    @Override
    public void deleteById(int proSaveId) {
        propertySaveRepository.deleteById(proSaveId);
    }
}
