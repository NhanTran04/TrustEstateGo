// components/Users/components/RolesField.tsx
import React from 'react';
import { useRecordContext } from 'react-admin';
import { Chip, Stack, Typography } from '@mui/material';
import { User } from './types';

export const RolesField: React.FC = () => {
    const record = useRecordContext<User>();

    if (!record?.roles || record.roles.length === 0) {
        return <Typography variant="body2" color="text.secondary">Không có</Typography>;
    }

    return (
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
            {record.roles.map((role, index) => (
                <Chip
                    key={index}
                    label={role.name}
                    size="small"
                    color="primary"
                    variant="outlined"
                />
            ))}
        </Stack>
    );
};
