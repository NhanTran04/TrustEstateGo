import React from "react";
import { Show, SimpleShowLayout, TextField, NumberField, DateField } from "react-admin";

export const PackageShow: React.FC = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Tên gói" />
            <NumberField source="price" label="Giá" />
            <NumberField source="duration" label="Thời hạn (tháng)" />
            <TextField source="description" label="Mô tả" />
            <DateField source="createdAt" label="Ngày tạo" />
        </SimpleShowLayout>
    </Show>
);
