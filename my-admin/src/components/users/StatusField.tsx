// components/Users/components/StatusField.tsx
import React from 'react';
import { useRecordContext } from 'react-admin';
import { Chip } from '@mui/material';
import { User } from './types';

export const StatusField: React.FC = () => {
    const record = useRecordContext<User>();

    return (
        <Chip
            label={record?.isActive ? 'Hoạt động' : 'Không hoạt động'}
            color={record?.isActive ? 'success' : 'error'}
            size="small"
            variant="filled"
        />
    );
};
