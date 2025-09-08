// components/Roles/RoleEdit.tsx
import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    minLength,
    ReferenceArrayInput,
    CheckboxGroupInput,
} from 'react-admin';
import { Box, Typography, Stack } from '@mui/material';
import { Security as SecurityIcon } from '@mui/icons-material';
import { useRecordContext } from 'react-admin';

// const DebugRole = () => {
//     const record = useRecordContext();
//     console.log("Record in Edit form:", record);
//     return null;
// };

export const RoleEdit: React.FC = () => (
    <Edit redirect="list">
        <SimpleForm>
            {/* <DebugRole /> */}
            <Stack direction="row" spacing={4} alignItems="flex-start">
                {/* Cột trái - Thông tin vai trò */}
                <Box sx={{ flex: 1, maxWidth: 500 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        color="primary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <SecurityIcon />
                        Chỉnh sửa vai trò
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
                </Box>

                {/* Cột phải - Chọn quyền */}
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                    >
                        Quyền hạn
                    </Typography>
                    <ReferenceArrayInput
                        source="permissions"
                        reference="permissions"
                        format={(value) => {
                            if (!Array.isArray(value)) return [];
                            // map object -> id
                            const ids = value.map(p => (typeof p === 'object' ? p.id : p));
                            // loại bỏ duplicate
                            return Array.from(new Set(ids));
                        }}
                        parse={(value) => value}
                    >
                        <CheckboxGroupInput optionText="name" optionValue="id" />
                    </ReferenceArrayInput>

                </Box>
            </Stack>
        </SimpleForm>
    </Edit>
);
