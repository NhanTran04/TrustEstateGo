package com.tln.trustestatego.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tln.trustestatego.enums.PropertyType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PropertyAdminRequest {
    @Min(value = 1, message = "Category ID must be greater than 0")
    int categoryId;
    @Min(value = 1, message = "Category ID must be greater than 0")
    int userId;
    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    String title;
    String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime expireAt;
    //    @NotNull(message = "Price is required")
//    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    BigDecimal price;
    @NotBlank(message = "Location is required")
    String location;
    Boolean isActive;
    PropertyType propertyType;
    MultipartFile[] images;
    Integer area;
    Integer bedroom;
    String interior;
}
