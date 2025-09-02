import React from 'react';
import { useRecordContext } from 'react-admin';
import { Box, Typography } from '@mui/material';
import { AttachMoney as PriceIcon } from '@mui/icons-material';
import { Property } from '../types';

const PriceField: React.FC = () => {
    const record = useRecordContext<Property>();
    if (!record) return null;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PriceIcon fontSize="small" color="primary" />
            <Typography variant="body2" fontWeight="bold" color="primary">
                {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(record.price)}
            </Typography>
        </Box>
    );
};

export default PriceField;