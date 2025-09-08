import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    required,
    minLength,
    ReferenceArrayInput,
    CheckboxGroupInput
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import { Security as SecurityIcon } from '@mui/icons-material';

export const RoleCreate: React.FC = () => (
    <Create redirect="list">
        <SimpleForm>
            <Box sx={{ maxWidth: 600 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                    <SecurityIcon />
                    Tạo vai trò mới
                </Typography>

                <TextInput
                    source="name"
                    label="Tên vai trò"
                    validate={[required(), minLength(2)]}
                    fullWidth
                    helperText="Tên vai trò (ví dụ: Admin, User, Moderator)"
                />
                <TextInput
                    source="description"
                    label="Mô tả"
                    validate={[minLength(5)]}
                    multiline
                    rows={4}
                    fullWidth
                    helperText="Mô tả về quyền hạn và trách nhiệm của vai trò này"
                />

                {/* Gán nhiều quyền */}
                <ReferenceArrayInput
                    source="permissions"
                    reference="permissions"
                    parse={(value: any) => value && value.map((v: any) => v.id)}   // khi gửi lên -> chỉ lấy id
                    format={(value: any) => value && value.map((id: number) => ({ id }))} // khi load về -> cần object có id
                >
                    <CheckboxGroupInput optionText="name" optionValue="id" />
                </ReferenceArrayInput>
            </Box>
        </SimpleForm>
    </Create>
);
