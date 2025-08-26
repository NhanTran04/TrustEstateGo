package com.tln.trustestatego.document;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(indexName = "properties")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PropertyDocument {
    @Id
    int id;
    @Field(type = FieldType.Text, analyzer = "standard")
    String title;
    String description;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    LocalDateTime expireAt;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Instant expireAt;
    BigDecimal price;
    String location;
    Boolean isActive;
    String propertyType;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
//    LocalDateTime createdAt;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Instant createdAt;
    List<String> images;
}
