import React from 'react';
import { useRecordContext } from 'react-admin';
import { Box, Typography } from '@mui/material';
import { Schedule as DurationIcon } from '@mui/icons-material';
import { Package } from './types';


const DurationField: React.FC = () => {
    const record = useRecordContext<Package>();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <DurationIcon fontSize="small" color="action" />
            <Typography variant="body2">
                {record?.duration} ngày
            </Typography>
        </Box>
    );
};

export default DurationField;