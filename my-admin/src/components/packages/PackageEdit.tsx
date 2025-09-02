import React from "react";
import { Edit, SimpleForm, TextInput, NumberInput, DateField } from "react-admin";
import BreadcrumbTitle from "../Breadcrumb";

export const PackageEdit: React.FC = () => (
    <Edit title={<BreadcrumbTitle base="Gói" basePath="/packages" />}>
        <SimpleForm>
            <TextInput source="name" label="Tên gói" fullWidth />
            <NumberInput source="price" label="Giá" />
            <NumberInput source="duration" label="Thời hạn (tháng)" />
            <TextInput source="description" label="Mô tả" multiline fullWidth />
            <DateField source="createdAt" label="Ngày tạo" />
        </SimpleForm>
    </Edit>
);