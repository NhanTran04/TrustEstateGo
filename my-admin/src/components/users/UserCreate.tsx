import React from 'react';
import {
    Create, TabbedForm, FormTab, TextInput, SelectInput,
    DateInput, BooleanInput, ReferenceArrayInput, SelectArrayInput, required, email, minLength,
    CheckboxGroupInput,
    ImageInput,
    ImageField,
    ReferenceInput
} from 'react-admin';
import { Box } from '@mui/material';
import { Person } from '@mui/icons-material';

export const UserCreate: React.FC = () => (
    <Create redirect="list">
        <TabbedForm>
            <FormTab label="Thông tin cơ bản" icon={<Person />}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                    <TextInput source="firstName" label="Tên" validate={[required(), minLength(1)]} />
                    <TextInput source="lastName" label="Họ" validate={[required(), minLength(1)]} />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <TextInput source="username" label="Tên đăng nhập" validate={[required(), minLength(3)]} />
                    <TextInput source="email" label="Email" validate={[required(), email()]} />
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <TextInput source="password" label="Mật khẩu" type="password" validate={[required(), minLength(6)]} />
                    <SelectInput
                        source="gender"
                        label="Giới tính"
                        choices={[
                            { id: true, name: 'Nam' },
                            { id: false, name: 'Nữ' },
                        ]}
                        validate={required()}
                        defaultValue={true}
                        sx={{ marginTop: 0 }}
                    />
                </Box>


                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <DateInput source="birthday" label="Ngày sinh" />
                    <TextInput source="phone" label="Số điện thoại" />
                </Box>


                <TextInput source="address" label="Địa chỉ" multiline rows={2} />
                <ReferenceInput source="roleId" reference="roles" label="Vai trò">
                    <SelectInput optionText="name" optionValue="id" />
                </ReferenceInput>
                <ImageInput multiple={false} source="avatar" label="Ảnh đại diện" accept={{ "image/*": [] }}>
                    <ImageField source="src" title="title" />
                </ImageInput>

                <BooleanInput source="isActive" label="Tài khoản hoạt động" defaultValue={true} />

            </FormTab>

        </TabbedForm>
    </Create>
);
