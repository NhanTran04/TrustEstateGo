import React from 'react';
import {
    Create, TabbedForm, FormTab, TextInput, SelectInput,
    DateInput, BooleanInput, ReferenceArrayInput, SelectArrayInput, required, email, minLength
} from 'react-admin';
import { Box } from '@mui/material';
import { Person } from '@mui/icons-material';

export const UserCreate: React.FC = () => (
    <Create>
        <TabbedForm>
            <FormTab label="Thông tin cơ bản" icon={<Person />}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <TextInput source="firstName" label="Tên" validate={[required(), minLength(1)]} />
                    <TextInput source="lastName" label="Họ" validate={[required(), minLength(1)]} />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <TextInput source="username" label="Tên đăng nhập" validate={[required(), minLength(3)]} />
                    <TextInput source="email" label="Email" validate={[required(), email()]} />
                </Box>

                <TextInput source="password" label="Mật khẩu" type="password" validate={[required(), minLength(6)]} />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <SelectInput
                        source="gender"
                        label="Giới tính"
                        choices={[
                            { id: 'MALE', name: 'Nam' },
                            { id: 'FEMALE', name: 'Nữ' },
                            { id: 'OTHER', name: 'Khác' },
                        ]}
                        validate={required()}
                        defaultValue="MALE"
                    />
                    <DateInput source="birthday" label="Ngày sinh" />
                </Box>

                <TextInput source="phone" label="Số điện thoại" />
                <TextInput source="address" label="Địa chỉ" multiline rows={2} />
                <TextInput source="avatar" label="URL Avatar" />
                <BooleanInput source="isActive" label="Tài khoản hoạt động" defaultValue={true} />
            </FormTab>

            <FormTab label="Vai trò & Quyền">
                <ReferenceArrayInput source="roles" reference="roles" label="Vai trò">
                    <SelectArrayInput optionText="name" />
                </ReferenceArrayInput>
            </FormTab>
        </TabbedForm>
    </Create>
);
