import React from "react";
import { Create, SimpleForm, TextInput, NumberInput, RecordContextProvider } from "react-admin";
import BreadcrumbTitle from "../Breadcrumb";

export const PackageCreate: React.FC = () => (
    <Create redirect="list" title={
        <RecordContextProvider value={{ name: "Tạo" }}>
            <BreadcrumbTitle base="Gói" basePath="/packages" />
        </RecordContextProvider>
    }>
        <SimpleForm>
            <TextInput source="name" label="Tên gói" fullWidth />
            <NumberInput source="price" label="Giá" />
            <NumberInput source="duration" label="Thời hạn (tháng)" />
            <TextInput source="description" label="Mô tả" multiline fullWidth />
        </SimpleForm>
    </Create>
);