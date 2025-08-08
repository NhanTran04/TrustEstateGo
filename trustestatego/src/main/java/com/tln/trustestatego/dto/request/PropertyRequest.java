package com.tln.trustestatego.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tln.trustestatego.entity.Category;
import com.tln.trustestatego.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PropertyRequest {
    int categoryId;
    int userId;
    String title;
    String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime expireAt;
    BigDecimal price;
    String location;
    Boolean isActive;
    String propertyType;
    MultipartFile[] images;
}
