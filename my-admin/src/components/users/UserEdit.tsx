import React from 'react';
import {
    Edit, TabbedForm, FormTab, TextInput, SelectInput,
    DateInput, BooleanInput, ReferenceInput, required, email, minLength,
    ImageInput, ImageField,
    ReferenceArrayInput,
    SelectArrayInput
} from 'react-admin';
import { Box } from '@mui/material';
import { Person } from '@mui/icons-material';

export const UserEdit: React.FC = () => (
    <Edit redirect="list">
        <TabbedForm>
            <FormTab label="Thông tin cơ bản" icon={<Person />}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                    <TextInput source="firstName" label="Tên" validate={[required(), minLength(1)]} />
                    <TextInput source="lastName" label="Họ" validate={[required(), minLength(1)]} />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <TextInput readOnly source="username" label="Tên đăng nhập" validate={[required(), minLength(3)]} />
                    <TextInput readOnly source="email" label="Email" validate={[required(), email()]} />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <TextInput source="password" label="Mật khẩu" type="password" validate={[minLength(6)]} />
                    <TextInput source="phone" label="Số điện thoại" />
                </Box>

                <TextInput source="address" label="Địa chỉ" multiline rows={2} />

                <ReferenceArrayInput source="roleId" reference="roles" label="Vai trò">
                    <SelectArrayInput optionText="name" optionValue="id" />
                </ReferenceArrayInput>

                <ImageInput multiple={false} source="avatar" label="Ảnh đại diện" accept={{ "image/*": [] }}>
                    <ImageField source="src" title="title" />
                </ImageInput>

                <BooleanInput source="isActive" label="Tài khoản hoạt động" />
            </FormTab>
        </TabbedForm>
    </Edit>
);
