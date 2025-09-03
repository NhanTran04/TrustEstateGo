import React from 'react';
import { useRecordContext } from 'react-admin';
import { Typography } from '@mui/material';
import { User } from './types';

export const FullNameField: React.FC = () => {
    const record = useRecordContext<User>();
    return (
        <Typography variant="body2" fontWeight={500}>
            {`${record?.firstName || ''} ${record?.lastName || ''}`.trim() || 'N/A'}
        </Typography>
    );
};
