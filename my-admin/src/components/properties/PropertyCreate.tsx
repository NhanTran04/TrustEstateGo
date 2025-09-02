import React from "react";
import {
    Create,
    TabbedForm,
    FormTab,
    TextInput,
    ReferenceInput,
    SelectInput,
    NumberInput,
    DateTimeInput,
    BooleanInput,
    required,
    minLength,
    minValue,
    FileInput,
    ImageField,
    RecordContextProvider,
} from "react-admin";
import { Box } from "@mui/material";
import { Home } from "@mui/icons-material";
import BreadcrumbTitle from "../Breadcrumb";

export const PropertyCreate: React.FC = () => (
    <Create
        redirect="list"
        title={
            <RecordContextProvider value={{ name: "Tạo" }}>
                <BreadcrumbTitle base="Bài đăng" basePath="/properties" />
            </RecordContextProvider>
        }
    >
        <TabbedForm>
            <FormTab label="Thông tin cơ bản" icon={<Home />}>
                <TextInput
                    source="title"
                    label="Tiêu đề"
                    validate={[required(), minLength(5)]}
                    fullWidth
                />

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mt: 2 }}>
                    <ReferenceInput source="categoryId" reference="categories" label="Danh mục">
                        <SelectInput optionText="name" validate={required()} />
                    </ReferenceInput>

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
                        validate={required()}
                        defaultValue="apartment"
                    />
                </Box>

                <NumberInput
                    source="userId"
                    label="UserId"
                    validate={[required(), minValue(0)]}
                    defaultValue={0}
                    sx={{ mt: 2 }}
                />
                <NumberInput
                    source="price"
                    label="Giá (VNĐ)"
                    validate={[required(), minValue(0)]}
                    defaultValue={0}
                    sx={{ mt: 2 }}
                />
                <TextInput
                    source="location"
                    label="Địa chỉ"
                    validate={[required(), minLength(5)]}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <TextInput
                    source="description"
                    label="Mô tả chi tiết"
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ mt: 2 }}
                />

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 2, mt: 2 }}>
                    <DateTimeInput source="expireAt" label="Ngày hết hạn" validate={required()} />
                    <BooleanInput source="isActive" label="Hoạt động" defaultValue={true} />
                </Box>

                <FileInput
                    source="images"
                    label="Tải lên hình ảnh"
                    accept={{ "image/*": [] }}
                    multiple
                    sx={{
                        "& .RaFileInput-dropZone": {
                            backgroundColor: "#e0e0e0",
                            border: "2px dashed #6200ea",
                            color: "#6200ea",
                            "&:hover": { backgroundColor: "#d1c4e9" },
                        },
                    }}
                >
                    <ImageField source="src" title="title" />
                </FileInput>
            </FormTab>
        </TabbedForm>
    </Create>
);
