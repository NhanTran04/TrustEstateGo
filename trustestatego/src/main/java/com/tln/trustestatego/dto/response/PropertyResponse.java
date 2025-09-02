package com.tln.trustestatego.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tln.trustestatego.entity.Category;
import com.tln.trustestatego.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PropertyResponse {
    int id;
    int categoryId;
    int userId;
    String categoryName;
    String title;
    String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime expireAt;
    BigDecimal price;
    String location;
    Boolean isActive;
    String propertyType;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime createdAt;
    List<String> images;
}
