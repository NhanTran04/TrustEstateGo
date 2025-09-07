// components/Roles/RoleShow.tsx
import React from 'react';
import { Show, SimpleShowLayout, TextField, FunctionField } from 'react-admin';
import { Divider } from '@mui/material';
// import { RoleCard } from './components/RoleCard';

export const RoleShow: React.FC = () => (
    <Show>
        <SimpleShowLayout>
            {/* <FunctionField render={() => <RoleCard />} label="" /> */}
            <Divider sx={{ my: 2 }} />
            <TextField source="id" label="ID vai trò" />
            <TextField source="name" label="Tên vai trò" />
            <TextField source="description" label="Mô tả" />
        </SimpleShowLayout>
    </Show>
);
