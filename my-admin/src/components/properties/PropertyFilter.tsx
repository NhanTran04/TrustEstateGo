// PropertyFilter.tsx
import React from "react";
import { SearchInput, SelectInput, NumberInput } from "react-admin";

const propertyFilters = [
    <SearchInput source="q" placeholder="Tìm kiếm tiêu đề" alwaysOn />,
    <SelectInput
        source="propertyType"
        label="Loại bất động sản"
        choices={[
            { id: "apartment", name: "Căn hộ" },
            { id: "house", name: "Nhà phố" },
            { id: "villa", name: "Biệt thự" },
            { id: "office", name: "Văn phòng" },
            { id: "land", name: "Đất" },
        ]}
    />,
    <SelectInput
        source="isActive"
        label="Trạng thái"
        choices={[
            { id: true, name: "Hoạt động" },
            { id: false, name: "Không hoạt động" },
        ]}
    />,
    <NumberInput source="minPrice" label="Giá từ (VNĐ)" />,
    <NumberInput source="maxPrice" label="Giá đến (VNĐ)" />,
];

export default propertyFilters;
