import React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";

export const PackageCreate: React.FC = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Tên gói" fullWidth />
            <NumberInput source="price" label="Giá" />
            <NumberInput source="duration" label="Thời hạn (tháng)" />
            <TextInput source="description" label="Mô tả" multiline fullWidth />
        </SimpleForm>
    </Create>
);