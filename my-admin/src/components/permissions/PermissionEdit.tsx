import React from 'react';
import { Edit, SimpleForm, TextInput, required, minLength } from 'react-admin';
import { Box, Typography } from '@mui/material';
import { VpnKey as KeyIcon } from '@mui/icons-material';

export const PermissionEdit: React.FC = () => (
    <Edit redirect="list">
        <SimpleForm>
            <Box sx={{ maxWidth: 600 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                    <KeyIcon />
                    Chỉnh sửa quyền
                </Typography>

                <TextInput
                    source="name"
                    label="Tên quyền"
                    validate={[required(), minLength(3)]}
                    fullWidth
                    helperText="Tên quyền (ví dụ: USER_READ, ADMIN_WRITE)"
                />

                <TextInput
                    source="description"
                    label="Mô tả"
                    validate={[minLength(5)]}
                    multiline
                    rows={4}
                    fullWidth
                    helperText="Mô tả chi tiết về quyền này"
                />
            </Box>
        </SimpleForm>
    </Edit>
);
