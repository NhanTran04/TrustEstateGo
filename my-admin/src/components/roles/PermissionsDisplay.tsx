import React from 'react';
import { Box, Typography, Paper, Grid, Chip, Stack } from '@mui/material';
import { VpnKey as PermissionIcon } from '@mui/icons-material';
import { Permission } from './types';

const PermissionChip: React.FC<{ permission: Permission }> = ({ permission }) => (
    <Chip
        icon={<PermissionIcon />}
        label={permission.name}
        variant="outlined"
        size="small"
        color="info"
        title={permission.description}
        sx={{ m: 0.5 }}
    />
);

const PermissionsDisplay: React.FC<{ permissions?: Permission[] }> = ({ permissions }) => {
    if (!permissions || permissions.length === 0) {
        return (
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
                Không có quyền nào được gán
            </Typography>
        );
    }

    return (
        <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PermissionIcon fontSize="small" />
                Quyền hạn ({permissions.length})
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {permissions.map((permission) => (
                        <PermissionChip key={permission.id} permission={permission} />
                    ))}
                </Stack>
            </Paper>
        </Box>
    );
};

export default PermissionsDisplay;
