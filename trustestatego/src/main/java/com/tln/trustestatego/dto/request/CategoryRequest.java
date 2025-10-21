package com.tln.trustestatego.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class CategoryRequest {
    @NotBlank(message = "Category name must not be blank")
    @Size(min = 2, max = 100, message = "Category name must be between 2 and 100 characters")
    String name;
}
