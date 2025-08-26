package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.response.PageResponse;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.function.Function;

@Mapper(componentModel = "spring")
public interface PageMapper {
    default <R> PageResponse<R> toPageResponse(Page<R> page){
        if(page == null)
            return null;

        List<R> content = page.getContent().stream().toList();

        return new PageResponse<>(
                content,
                page.getSize(),
                page.getNumber(),
                page.getTotalPages(),
                page.getTotalElements());
    }
}
