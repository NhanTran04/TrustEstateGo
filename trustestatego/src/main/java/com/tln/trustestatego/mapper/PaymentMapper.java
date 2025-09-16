package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.response.PaymentResponse;
import com.tln.trustestatego.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    @Mapping(source = "packageField.name", target = "packageName")
    @Mapping(source = "packageField.price", target = "packagePrice")
    PaymentResponse toResponse(Payment payment);
}
