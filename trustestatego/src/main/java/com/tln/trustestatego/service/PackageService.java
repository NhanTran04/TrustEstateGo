package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.request.PackageRequest;
import com.tln.trustestatego.dto.response.CategoryResponse;
import com.tln.trustestatego.dto.response.PackageResponse;
import com.tln.trustestatego.entity.Category;
import com.tln.trustestatego.entity.Package;
import com.tln.trustestatego.mapper.PackageMapper;
import com.tln.trustestatego.repository.PackageRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PackageService {

    PackageMapper packageMapper;

    PackageRepository packageRepository;

    public List<PackageResponse> getPackages(){
        return packageRepository.findAll()
                .stream()
                .map(packageMapper::toPackageResponse)
                .collect(Collectors.toList());
    }

    public PackageResponse createPackage(PackageRequest packageRequest){
        Package pack = packageMapper.toPackage(packageRequest);
        pack.setCreatedAt(LocalDateTime.now());
        return packageMapper.toPackageResponse(packageRepository.save(pack));
    }

    public PackageResponse updatePackage(int packId, PackageRequest packageRequest){
        Package pack = packageRepository.findById(packId)
                .orElseThrow(() ->new RuntimeException("User not found"));
        packageMapper.update(pack,packageRequest);
        return packageMapper.toPackageResponse(packageRepository.save(pack));
    }

    public void deletePackage(int packId){
        packageRepository.deleteById(packId);
    }
}
