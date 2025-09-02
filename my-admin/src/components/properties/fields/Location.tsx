import React from 'react';
import { useRecordContext } from 'react-admin';
import { Box, Typography } from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';
import { Property } from '../types';

export const LocationField: React.FC = () => {
    const record = useRecordContext<Property>();
    if (!record) return null;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationIcon fontSize="small" color="action" />
            <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                {record.location || 'Chưa có địa chỉ'}
            </Typography>
        </Box>
    );
};