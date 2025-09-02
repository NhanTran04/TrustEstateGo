import React from 'react';
import { useRecordContext } from 'react-admin';
import { Chip } from '@mui/material';
import { CheckCircle as ActiveIcon, Cancel as InactiveIcon } from '@mui/icons-material';
import { Property } from '../types';

const StatusField: React.FC = () => {
    const record = useRecordContext<Property>();
    if (!record) return null;

    return (
        <Chip
            icon={record.isActive ? <ActiveIcon /> : <InactiveIcon />}
            label={record.isActive ? 'Hoạt động' : 'Không hoạt động'}
            color={record.isActive ? 'success' : 'error'}
            size="small"
        />
    );
};

export default StatusField;