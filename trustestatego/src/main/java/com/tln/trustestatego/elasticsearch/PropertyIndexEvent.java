package com.tln.trustestatego.elasticsearch;

import lombok.Getter;

@Getter
public class PropertyIndexEvent {
    private final Integer propertyId;
    private final boolean deleted;

    public PropertyIndexEvent(Integer propertyId, boolean deleted) {
        this.propertyId = propertyId;
        this.deleted = deleted;
    }
}