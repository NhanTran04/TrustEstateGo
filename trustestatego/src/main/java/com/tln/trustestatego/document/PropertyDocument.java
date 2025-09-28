package com.tln.trustestatego.document;

import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.elasticsearch.annotations.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(indexName = "properties")
@Setting(settingPath = "/elasticsearch/settings.json")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PropertyDocument {

    @Id
    String id;

    // QUAN TRỌNG: Phải có analyzer và searchAnalyzer để tìm "tro" ra "trọ"
    @Field(type = FieldType.Text, analyzer = "custom_index_analyzer", searchAnalyzer = "custom_search_analyzer")
    String title;

    @Field(type = FieldType.Text, analyzer = "custom_index_analyzer", searchAnalyzer = "custom_search_analyzer")
    String location;

    @Field(type = FieldType.Double)
    Double price;

    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    Instant expireAt;

    @Field(type = FieldType.Boolean)
    Boolean isActive;

    @Field(type = FieldType.Keyword)
    String propertyType;

    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    Instant createdAt;

    @Field(type = FieldType.Keyword)
    List<String> images;

    @Field(type = FieldType.Integer)
    Integer area;

    @Field(type = FieldType.Integer)
    Integer bedroom;

    @Field(type = FieldType.Keyword)
    String interior;

    @Field(type = FieldType.Integer)
    Integer userId;

    @Field(type = FieldType.Integer)
    Integer categoryId;
}