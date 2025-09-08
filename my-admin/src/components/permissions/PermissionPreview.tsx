import React from 'react';
import { useRecordContext } from 'react-admin';
import { Box, Typography, Avatar } from '@mui/material';
import { Security as PermissionIcon } from '@mui/icons-material';
import { Permission } from './types';

const PermissionPreview: React.FC = () => {
    const record = useRecordContext<Permission>();
    if (!record) return null;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                <PermissionIcon fontSize="small" />
            </Avatar>
            <Box>
                <Typography variant="body2" fontWeight={600}>
                    {record.name}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    sx={{ maxWidth: 250 }}
                >
                    {record.description}
                </Typography>
            </Box>
        </Box>
    );
};

export default PermissionPreview;
